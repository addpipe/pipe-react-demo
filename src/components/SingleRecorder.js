import { useState, useReducer } from "react";
import usePipeSDK from "@addpipe/react-pipe-media-recorder"; // Importing the Pipe recorder npm package

const RecordingState = {
  Initialized: "Initialized",
  Ready: "Ready",
  Recording: "Recording",
  Paused: "Paused",
  Playback: "Playback",
};

const ActionType = {
  LOADED: "LOADED",
  START_RECORDING: "START_RECORDING",
  STOP_RECORDING: "STOP_RECORDING",
  START_PLAYBACK: "START_PLAYBACK",
  PAUSE_PLAYBACK: "PAUSE_PLAYBACK",
};

const initialState = {
  status: RecordingState.Initialized,
};

const reducer = (state, action) => {
  switch (action.type) {
    case ActionType.LOADED:
      return { status: RecordingState.Ready };
    case ActionType.START_RECORDING:
      return { status: RecordingState.Recording };
    case ActionType.STOP_RECORDING:
      return { status: RecordingState.Ready };
    case ActionType.START_PLAYBACK:
      return { status: RecordingState.Playback };
    case ActionType.PAUSE_PLAYBACK:
      return { status: RecordingState.Paused };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const SingleRecorder = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [recorder, setRecorder] = useState();

  const { isLoaded } = usePipeSDK((PipeSDK) => {
    if (isLoaded) return;

    const pipeParams = {
      size: { width: "80%", height: 390 },
      qualityurl: "avq/360p.xml",
      accountHash: "NON-EXISTENT-HASH-SO-THAT-THE-VIDEOS-ARE-NOT-PROCESSED-AT-ALL",
      eid: "YOUR_ENV_CODE",
      mrt: 600,
      avrec: 1,
    };

    PipeSDK.insert("custom-id", pipeParams, (pipeRecorder) => {
      setRecorder(pipeRecorder);

      pipeRecorder.onReadyToRecord = () => {
        dispatch({ type: ActionType.LOADED });
      };
    });
  });

  const startRecording = () => {
    if (state.status === RecordingState.Initialized) return;
    recorder?.record();
    dispatch({ type: ActionType.START_RECORDING });
  };

  const stopRecording = () => {
    if (state.status !== RecordingState.Recording) return;
    recorder?.stopVideo();
    dispatch({ type: ActionType.STOP_RECORDING });
  };

  const playbackRecording = () => {
    if (state.status === RecordingState.Initialized || !recorder) return;

    if (state.status === RecordingState.Paused || state.status === RecordingState.Ready) {
      recorder?.playVideo();
      dispatch({ type: ActionType.START_PLAYBACK });
    }

    if (state.status === RecordingState.Playback) {
      recorder?.pause();
      dispatch({ type: ActionType.PAUSE_PLAYBACK });
    }

    recorder.onPlaybackComplete = () => {
      if (state.status === RecordingState.Recording) return;
      dispatch({ type: ActionType.LOADED });
    };
  };

  return (
    <div>
      <h2>One single recording client embedded</h2>
      <p>
        <small>
          Made by the <a href="https://addpipe.com">Pipe Recording Platform</a>
        </small>
      </p>
      {!isLoaded && <div className="placeholder">Loading the Pipe recorder</div>}
      <div id="custom-id"></div>
      <br />
      <div id="controls">
        {recorder && state.status !== RecordingState.Initialized && (
          <>
            <button onClick={startRecording}>Record</button>
            <button onClick={stopRecording}>Stop</button>
            <button onClick={playbackRecording}>{state.status === RecordingState.Playback ? "Pause" : "Play"}</button>
          </>
        )}
      </div>
    </div>
  );
};

export default SingleRecorder;
