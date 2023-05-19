import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Box,
  Flex,
} from "@chakra-ui/react";

export default function ConfirmModal({
  isOpen,
  onClose,
  message,
  onConfirm,
}: any) {
  return (
    <Modal
      size={{ base: "sm", md: "lg" }}
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
      isCentered
    >
      <ModalOverlay />
      <ModalContent px={{ base: 1, md: 4 }} py={4}>
        <ModalCloseButton />
        <ModalBody>
          <Text
            textAlign={"center"}
            fontSize={20}
            color="#262627"
            fontWeight="bold"
          >
            Confirm Delete
          </Text>

          <Flex justify={"center"}>
            <Box w="67%">
              <Box textAlign={"center"} color="#262627" fontSize={16}>
                <Text>{message}</Text>
              </Box>
            </Box>
          </Flex>
        </ModalBody>
        <ModalFooter
          display={{ base: "block", md: "flex" }}
          justifyContent="center"
          pb={2}
        >
          <Button
            size="sm"
            colorScheme="mood1"
            variant="outline"
            color="mood1.500"
            fontSize="16px"
            width={{ base: "full", md: "100px" }}
            mr={{ base: 0, md: 6 }}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            size="sm"
            colorScheme="green"
            fontSize="16px"
            width={{ base: "full", md: "100px" }}
            mb={{ base: 5, md: 0 }}
            onClick={onConfirm}
            mr={2}
          >
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
