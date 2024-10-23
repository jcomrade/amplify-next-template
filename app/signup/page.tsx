"use client";
import { useState, type FormEvent } from "react";
import { Amplify } from "aws-amplify";
import { signUp, confirmSignUp, signIn, CodeDeliveryDetails } from "aws-amplify/auth";
import outputs from "@/amplify_outputs.json";
import { useRouter } from "next/navigation";
Amplify.configure(outputs);

interface SignUpFormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
}

interface ConfirmSignUpFormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  confirmationCode: HTMLInputElement;
}

interface SignUpForm extends HTMLFormElement {
  readonly elements: SignUpFormElements;
}

interface ConfirmSignUpForm extends HTMLFormElement {
  readonly elements: ConfirmSignUpFormElements;
}

interface nextStep {
  nextStep: any;
}

interface SignUpResult extends nextStep {
  isSignUpComplete: boolean;
  userId?: string;
}

export default function SignUp() {
  const [userSignUpData, setUserSignUpData] = useState({
    username: "",
    passsword: "",
  });
  const [userConfirmationCode, setConfirmationCode] = useState("");
  const [confirmationStep, setCconfirmationStep] = useState(false);
  const [nextStepData, setNextStepData] = useState<any>();
  const router = useRouter();

  async function handleSignUpConfirmation(event: FormEvent<ConfirmSignUpForm>) {
    event.preventDefault();
    const form = event.currentTarget;

    const { isSignUpComplete, nextStep } = await confirmSignUp({
      username: userSignUpData.username,
      confirmationCode: form.elements.confirmationCode.value,
    });

    if (isSignUpComplete){
      const { nextStep } = await signIn({
        username: userSignUpData.username,
        password: userSignUpData.passsword,
      })
      console.log(nextStep)
      router.push('/')
    }
  }

  async function handleSubmit(event: FormEvent<SignUpForm>) {
    event.preventDefault();
    const form = event.currentTarget;
    // ... validate inputs
    const { isSignUpComplete, userId, nextStep } = await signUp({
      username: userSignUpData.username,
      password: userSignUpData.passsword,
    });
    setNextStepData(nextStep);
    setCconfirmationStep(true);
    console.log(isSignUpComplete, userId, nextStep);
  }

  return !confirmationStep ? (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email:</label>
      <input
        type="text"
        id="email"
        name="email"
        value={userSignUpData.username}
        onChange={(e) =>
          setUserSignUpData({ ...userSignUpData, username: e.target.value })
        }
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        value={userSignUpData.passsword}
        onChange={(e) =>
          setUserSignUpData({ ...userSignUpData, passsword: e.target.value })
        }
      />
      <input type="submit" />
    </form>
  ) : (
    <form onSubmit={handleSignUpConfirmation}>
      <label htmlFor="confirmationEmail">
        {nextStepData.codeDeliveryDetails.destination}
      </label>
      <label htmlFor="confirmationCode">Confirmation Code:</label>
      <input
        type="text"
        id="text"
        name="confirmationCode"
        value={userConfirmationCode}
        onChange={(e) =>
          setConfirmationCode(e.target.value)
        }
      />
      <input type="submit" />
    </form>
  );
}
