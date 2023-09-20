/*
 *  Copyright (c) 2015 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
import "webrtc-adapter";
import { print, parse } from "sdp-parser";

// console.error(
//   RTCPeerConnection,
//   RTCPeerConnection.prototype.setLocalDescription
// );
// const oldSetLocalDescription = RTCPeerConnection.prototype.setLocalDescription;
// RTCPeerConnection.prototype.setLocalDescription = function (...args) {
//   if (args.length > 0) {
//     args[0].sdp = selectCodec(args[0].sdp);
//     console.error(args[0].sdp);
//   }
//   return oldSetLocalDescription.apply(args);
// };

async function setLocalDescription(pc, desc) {
  desc.sdp = selectCodec(desc.sdp);
  await pc.setLocalDescription(desc);
}

// const oldSetRemoteDescription =
//   RTCPeerConnection.prototype.setRemoteDescription;
// RTCPeerConnection.prototype.setRemoteDescription = (...args) => {
//   if (args.length > 0) {
//     args[0].sdp = selectCodec(args[0].sdp);
//   }
//   return oldSetRemoteDescription.apply(args);
// };

const offerOptions = {
  offerToReceiveAudio: true,
  offerToReceiveVideo: true,
};

// 选中的codec
let codec: string = "vp8";
let localStream;
let localVideo: HTMLVideoElement;
let remoteVideo: HTMLVideoElement;
let pc1: RTCPeerConnection;
let pc2: RTCPeerConnection;

function getName(pc) {
  return pc === pc1 ? "pc1" : "pc2";
}

function getOtherPc(pc) {
  return pc === pc1 ? pc2 : pc1;
}

function onCreateSessionDescriptionError(error) {
  console.log(`Failed to create session description: ${error.toString()}`);
}

async function onCreateOfferSuccess(desc) {
  console.log(`Offer from pc1\n${desc.sdp}`);
  console.log("pc1 setLocalDescription start");
  try {
    await setLocalDescription(pc1, desc);
    onSetLocalSuccess(pc1);
  } catch (e) {
    onSetSessionDescriptionError(e);
  }

  console.log("pc2 setRemoteDescription start");
  try {
    await pc2.setRemoteDescription(desc);
    onSetRemoteSuccess(pc2);
  } catch (e) {
    onSetSessionDescriptionError(e);
  }

  console.log("pc2 createAnswer start");
  // Since the 'remote' side has no media stream we need
  // to pass in the right constraints in order for it to
  // accept the incoming offer of audio and video.
  try {
    const answer = await pc2.createAnswer();
    await onCreateAnswerSuccess(answer);
  } catch (e) {
    onCreateSessionDescriptionError(e);
  }
}

function onSetLocalSuccess(pc) {
  console.log(`${getName(pc)} setLocalDescription complete`);
}

function onSetRemoteSuccess(pc) {
  console.log(`${getName(pc)} setRemoteDescription complete`);
}

function onSetSessionDescriptionError(error) {
  console.log(`Failed to set session description: ${error.toString()}`);
}

function gotRemoteStream(e) {
  if (remoteVideo.srcObject !== e.streams[0]) {
    remoteVideo.srcObject = e.streams[0];
    console.log("pc2 received remote stream");
  }
}

async function onCreateAnswerSuccess(desc) {
  console.log(`Answer from pc2:\n${desc.sdp}`);
  console.log("pc2 setLocalDescription start");
  try {
    await setLocalDescription(pc2, desc);
    onSetLocalSuccess(pc2);
  } catch (e) {
    onSetSessionDescriptionError(e);
  }
  console.log("pc1 setRemoteDescription start");
  try {
    await pc1.setRemoteDescription(desc);
    onSetRemoteSuccess(pc1);
  } catch (e) {
    onSetSessionDescriptionError(e);
  }
}

async function onIceCandidate(pc, event) {
  try {
    await getOtherPc(pc).addIceCandidate(event.candidate);
    onAddIceCandidateSuccess(pc);
  } catch (e) {
    onAddIceCandidateError(pc, e);
  }
  console.log(
    `${getName(pc)} ICE candidate:\n${
      event.candidate ? event.candidate.candidate : "(null)"
    }`
  );
}

function onAddIceCandidateSuccess(pc) {
  console.log(`${getName(pc)} addIceCandidate success`);
}

function onAddIceCandidateError(pc, error) {
  console.log(
    `${getName(pc)} failed to add ICE Candidate: ${error.toString()}`
  );
}

function onIceStateChange(pc, event) {
  if (pc) {
    console.log(`${getName(pc)} ICE state: ${pc.iceConnectionState}`);
    console.log("ICE state change event: ", event);
  }
}

async function start() {
  console.log("Requesting local stream");
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    console.log("Received local stream");
    localVideo.srcObject = stream;
    localStream = stream;
  } catch (e) {
    alert(`getUserMedia() error: ${e.name}`);
  }
}

async function call() {
  const videoTracks = localStream.getVideoTracks();
  const audioTracks = localStream.getAudioTracks();
  if (videoTracks.length > 0) {
    console.log(`Using video device: ${videoTracks[0].label}`);
  }
  if (audioTracks.length > 0) {
    console.log(`Using audio device: ${audioTracks[0].label}`);
  }
  const configuration = {};
  console.log("RTCPeerConnection configuration:", configuration);
  pc1 = new RTCPeerConnection(configuration);
  console.log("Created local peer connection object pc1");
  pc1.addEventListener("icecandidate", (e) => onIceCandidate(pc1, e));
  pc2 = new RTCPeerConnection(configuration);
  console.log("Created remote peer connection object pc2");
  pc2.addEventListener("icecandidate", (e) => onIceCandidate(pc2, e));
  pc1.addEventListener("iceconnectionstatechange", (e) =>
    onIceStateChange(pc1, e)
  );
  pc2.addEventListener("iceconnectionstatechange", (e) =>
    onIceStateChange(pc2, e)
  );
  pc2.addEventListener("track", gotRemoteStream);

  localStream.getTracks().forEach((track) => pc1.addTrack(track, localStream));
  console.log("Added local stream to pc1");

  try {
    console.log("pc1 createOffer start");
    const offer = await pc1.createOffer(offerOptions);
    await onCreateOfferSuccess(offer);
  } catch (e) {
    onCreateSessionDescriptionError(e);
  }
}

export async function startP2P(
  codec: string,
  localEl: string,
  remoteEl: string
) {
  localVideo = document.getElementById(localEl) as HTMLVideoElement;
  remoteVideo = document.getElementById(remoteEl) as HTMLVideoElement;
  codec = codec || "vp8";

  localVideo.addEventListener("loadedmetadata", function () {
    console.log(
      `Local video videoWidth: ${localVideo.videoWidth}px,  videoHeight: ${localVideo.videoHeight}px`
    );
  });

  remoteVideo.addEventListener("loadedmetadata", function () {
    console.log(
      `Remote video videoWidth: ${remoteVideo.videoWidth}px,  videoHeight: ${remoteVideo.videoHeight}px`
    );
  });

  await start();
  await call();
}

export async function changeCodec(newCodec: string) {
  if (pc1 && pc2 && newCodec !== codec) {
    codec = newCodec;
    try {
      console.log("pc1 createOffer start");
      const offer = await pc1.createOffer(offerOptions);
      await onCreateOfferSuccess(offer);
    } catch (e) {
      onCreateSessionDescriptionError(e);
    }
  }
}

function selectCodec(sdp) {
  const sdpParser = parse(sdp);
  const mediaDesc = sdpParser.mediaDescriptions.find(
    (ms) => ms.media.mediaType === "video"
  );
  if (!mediaDesc) {
    return sdp;
  }

  const h265Index = mediaDesc.attributes.payloads.findIndex(
    (py) => py.rtpMap?.encodingName === codec
  );

  if (h265Index === -1) {
    return sdp;
  }
  const mediaIndex = mediaDesc.media.fmts.findIndex(
    (pt) => +pt === mediaDesc.attributes.payloads[h265Index].payloadType
  );

  if (mediaIndex === -1) {
    return sdp;
  }
  const temp = mediaDesc.attributes.payloads[0];
  mediaDesc.attributes.payloads[0] = mediaDesc.attributes.payloads[h265Index];
  mediaDesc.attributes.payloads[h265Index] = temp;

  const temp2 = mediaDesc.media.fmts[0];
  mediaDesc.media.fmts[0] = mediaDesc.media.fmts[mediaIndex];
  mediaDesc.media.fmts[mediaIndex] = temp2;

  return print(sdpParser);
}

export async function getStats() {
  if (!pc1 || !pc2) {
    return;
  }
  const localReport = await pc1.getStats();
  let stats: any = {
    local: {},
    remote: {},
  };
  localReport.forEach((report) => {
    if (report.type === "outbound-rtp" && report.kind === "video") {
      stats.local = report;
      const codecReport = Array.from(localReport.values()).find(
        (re) => re.type === "codec" && re.id === report.codecId
      );
      console.warn(codecReport);
      console.warn(report);
      stats.local.codec = codecReport.mimeType || codecReport.codec;
    }
  });
  const remoteReport = await pc2.getStats();
  remoteReport.forEach((report) => {
    if (report.type === "inbound-rtp" && report.kind === "video") {
      stats.remote = report;
      const codecReport = Array.from(remoteReport.values()).find(
        (re) => re.type === "codec" && re.id === report.codecId
      );
      stats.remote.codec = codecReport.mimeType || codecReport.codec;
    }
  });

  return stats;
}
