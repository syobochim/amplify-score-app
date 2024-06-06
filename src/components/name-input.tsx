import React, { useState } from "react";
import { Button, Input, Text } from "@aws-amplify/ui-react";

interface NameInputProps {
  onSubmit: (name: string) => void;
}

export const NameInput: React.FC<NameInputProps> = ({onSubmit}) => {
  const [name, setName] = useState("");
  const [isDisabled, setIsDisabled] = useState<boolean>(false)

  const handleSubmit = () => {
    onSubmit(name);
    setIsDisabled(true);
  };

  return (
    <div>
      <Text fontSize="2em">お名前を入力してください</Text>
      <Input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button isDisabled={isDisabled} onClick={handleSubmit}>Submit</Button>
    </div>
  );
};