import { authModalState } from "@/src/atoms/AuthModalAtom"
import { Flex } from "@chakra-ui/react"
import React from "react"
import { useRecoilValue } from "recoil"
import Login from "./Login"

const AuthInputs: React.FC = () => {
	const modalState = useRecoilValue(authModalState)

	return (
		<Flex flexDirection='column' align='center' width='100%' mt={4}>
			{modalState.view === "login" && <Login />}
			{/* {modalState.view === "signup" && <SignUp />} */}
		</Flex>
	)
}
export default AuthInputs
