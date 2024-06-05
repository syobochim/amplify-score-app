import React, { useState } from "react";
import { Button, Input } from "@aws-amplify/ui-react";

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
      <Input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button isDisabled={isDisabled} onClick={handleSubmit}>Submit</Button>
    </div>
  );
};