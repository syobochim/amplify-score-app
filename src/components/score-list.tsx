import React from 'react';
import type { Schema } from "../../amplify/data/resource.ts";
import { Table, TableBody, TableCell, TableHead, TableRow } from '@aws-amplify/ui-react';
import { useTimeFormatter } from '../hooks/use-time-formatter.tsx';

interface ScoreListProps {
  scores: Array<Schema["Score"]["type"]>;
}

export const ScoreList: React.FC<ScoreListProps> = ({scores}) => {
  const {formatTime} = useTimeFormatter();

  const sortedScores = scores.sort((a, b) => {
    const aScore = a.totalScore ?? 0;
    const bScore = b.totalScore ?? 0;
    const aTime = a.totalTime ?? Infinity;
    const bTime = b.totalTime ?? Infinity;
    if (aScore === bScore) {
      return aTime - bTime;
    }
    return bScore - aScore;
  });

  return (
    <Table highlightOnHover={true}>
      <TableHead>
        <TableRow>
          <TableCell as="th">Ranking</TableCell>
          <TableCell as="th">Participant Name</TableCell>
          <TableCell as="th">Total Score</TableCell>
          <TableCell as="th">Total Time</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {sortedScores.map((score, index) => (
          <TableRow key={score.id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{score.participantName}</TableCell>
            <TableCell>{score.totalScore}</TableCell>
            <TableCell>{formatTime(score.totalTime)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
