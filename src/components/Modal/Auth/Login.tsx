import { authModalState } from "@/src/atoms/authModalAtom";
import { auth } from "@/src/firebase/clientApp";
import { FIREBASE_ERRORS } from "@/src/firebase/errors";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
	const setAuthModalState = useSetRecoilState(authModalState);
	const [loginForm, setLoginForm] = useState({
		email: "",
		password: "",
	});
	const [signInWithEmailAndPassword, user, loading, error] =
		useSignInWithEmailAndPassword(auth);

	// Firebase authentication
	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		signInWithEmailAndPassword(loginForm.email, loginForm.password);
	};

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		// update form state
		setLoginForm((prev) => ({
			...prev,
			[event.target.name]: event.target.value,
		}));
	};

	return (
		<form onSubmit={onSubmit}>
			<Input
				required
				onChange={onChange}
				name='email'
				placeholder='email'
				type='email'
				mb={2}
				fontSize='10pt'
				_placeholder={{ color: "gray.500" }}
				_hover={{
					bg: "white",
					border: "1px solid",
					borderColor: "blue.500",
				}}
				_focus={{
					outline: "none",
					bg: "white",
					border: "1px solid",
					borderColor: "blue.500",
				}}
				bg='gray.50'
			/>
			<Input
				required
				onChange={onChange}
				name='password'
				placeholder='password'
				type='password'
				mb={4}
				fontSize='10pt'
				_placeholder={{ color: "gray.500" }}
				_hover={{
					bg: "white",
					border: "1px solid",
					borderColor: "blue.500",
				}}
				_focus={{
					outline: "none",
					bg: "white",
					border: "1px solid",
					borderColor: "blue.500",
				}}
				bg='gray.50'
			/>

			<Text textAlign='center' color='red' fontSize='10pt'>
				{FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS]}
			</Text>

			<Button
				width='100%'
				height='36px'
				mt={4}
				mb={2}
				type='submit'
				isLoading={loading}
			>
				{" "}
				Log In
			</Button>

			<Flex fontSize='9pt' justifyContent='center'>
				<Text mr={1}>New on Reddit?</Text>
				<Text
					color='blue.500'
					fontWeight={700}
					cursor='pointer'
					onClick={() =>
						setAuthModalState((prev) => ({
							...prev,
							view: "signup",
						}))
					}
				>
					SIGN UP
				</Text>
			</Flex>
		</form>
	);
};
export default Login;
