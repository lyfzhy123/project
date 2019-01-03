(function (dependencies) {
  var RongSeal = dependencies.RongSeal,
    utils = RongSeal.utils,
    common = RongSeal.common,
    sealAlert = common.sealAlert,
    Dom = utils.Dom,
    getSelectedByName = Dom.getSelectedByName,
    getDomById = Dom.getById,
    Cache = utils.Cache;

  var roomDom = getDomById('roomId'),
    userDom = getDomById('userId'),
    startBtnDom = getDomById('start');
  
  var StorageKeys = {
    RoomId: 'rong-sealv2-roomid'
  };

  var setDefaultRTCInfo = function () {
    var roomId = Cache.get(StorageKeys.RoomId);
    if (roomId) {
      roomDom.value = roomId;
    }
  };

  var checkRTCValue = function () {
    var isRoomIdEmpty = !roomDom.value;
    var isUserIdEmpty = !userDom.value;
    var isValid = true;
    var prompt = '';
    if (isRoomIdEmpty) {
      prompt = '房间号不能为空';
      isValid = false;
    }
    if (isUserIdEmpty) {
      prompt = '用户名不能为空';
      isValid = false;
    }
    return {
      isValid: isValid,
      prompt: prompt
    };
  };

  var getRTCOption = function () {
    var resolutionDom = getSelectedByName('resolution'),
      closeVideoDom = getSelectedByName('isCloseVideo'),
      closeAudioDom = getSelectedByName('isCloseAudio');
    var roomId = roomDom.value,
      userId = userDom.value,
      resolution = common.formatResolution(resolutionDom.value),
      videoEnable = !closeVideoDom,
      audioEnable = !closeAudioDom;
    return {
      userId: userId,
      roomId: roomId,
      resolution: resolution,
      videoEnable: videoEnable,
      audioEnable: audioEnable
    };
  };

  var startRTC = function () {
    var checkContent = checkRTCValue();
    if (checkContent.isValid) {
      var option = getRTCOption();
      RongSeal.startRTC(option);
      Cache.set(StorageKeys.RoomId, option.roomId);
    } else {
      sealAlert(checkContent.prompt);
    }
  };

  (function init() {
    setDefaultRTCInfo();
    startBtnDom.onclick = startRTC;
  })();
  
})({
  win: window,
  RongSeal: window.RongSeal
});