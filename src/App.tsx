import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Stopwatch } from "./components/stopwatch";
import { NameInput } from "./components/name-input";
import { ScoreList } from "./components/score-list";
import { HintAnswerButtons } from "./components/hint-answer-button";
import { StepButtons } from "./components/step-buttons";
import { InfoDisplay } from "./components/info-display";

const client = generateClient<Schema>();

function App() {
  const [scores, setScores] = useState<Array<Schema["Score"]["type"]>>([]);
  const [recordId, setRecordId] = useState<string>("");
  const [participantName, setParticipantName] = useState<string>("");
  const [totalScore, setTotalScore] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const subscription = client.models.Score.observeQuery().subscribe({
      next: (data) => setScores([...data.items]),
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const savedRecordId = localStorage.getItem("recordId");
    const savedParticipantName = localStorage.getItem("participantName");
    const savedTotalScore = localStorage.getItem("totalScore");
    const savedCurrentPage = localStorage.getItem("currentPage");
    if (savedRecordId) {
      setRecordId(savedRecordId);
    }
    if (savedParticipantName) {
      setParticipantName(savedParticipantName);
    }
    if (savedTotalScore) {
      setTotalScore(parseInt(savedTotalScore, 10));
    }
    if (savedCurrentPage) {
      setCurrentPage(parseInt(savedCurrentPage, 10));
    }
  }, []);

  useEffect(() => {
    (async () => {
      if (recordId) {
        const {data: record} = await client.models.Score.get({id: recordId});
        if (record) {
          setTotalScore(record.totalScore ?? 0);
        }
      }
    })();
  }, [recordId]);

  useEffect(() => {
    localStorage.setItem("recordId", recordId);
    localStorage.setItem("participantName", participantName);
    localStorage.setItem("totalScore", totalScore.toString());
  }, [recordId, participantName, totalScore]);

  useEffect(() => {
    localStorage.setItem("currentPage", currentPage.toString());
  }, [currentPage]);

  const sendName = async (name: string) => {
    setParticipantName(name);
    const {data: newData} = await client.models.Score.create({participantName: name});
    if (newData) {
      setRecordId(newData.id);
      setTotalScore(newData.totalScore ?? 0);
    }
  };

  const sendScore = async (time: number) => {
    let newScore = totalScore + 10;

    if (showHint) {
      newScore -= 1; // ヒントを見た場合のスコア減少
    }
    if (showAnswer) {
      newScore -= 3; // 解答を見た場合のスコア減少
    }

    setTotalScore(newScore);
    await client.models.Score.update({id: recordId, totalScore: newScore, totalTime: time});
    setShowHint(false);
    setShowAnswer(false);
    setCurrentPage(3);
  };

  return (
    <main>
      {participantName ? (
        <InfoDisplay participantName={participantName} totalScore={totalScore}/>
      ) : (
        currentPage === 1 && (
          <div>
            <NameInput onSubmit={sendName}/>
          </div>
        )
      )}
      {currentPage === 1 && (
        <StepButtons onStepChange={setCurrentPage}/>
      )}
      {currentPage === 2 && (
        <div>
          <Stopwatch onComplete={sendScore}/>
          <HintAnswerButtons
            showHint={showHint}
            showAnswer={showAnswer}
            onShowHint={() => setShowHint(true)}
            onShowAnswer={() => setShowAnswer(true)}
          />
        </div>
      )}
      {currentPage === 3 && (
        <div>
          <StepButtons onStepChange={setCurrentPage}/>
          <ScoreList scores={scores}/>
        </div>
      )}
    </main>
  );
}

export default App;
