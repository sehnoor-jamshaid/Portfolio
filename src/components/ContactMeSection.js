import React, {useEffect,useRef} from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
  Spinner 
} from "@chakra-ui/react";
import * as Yup from 'yup';
import FullScreenSection from "./FullScreenSection";
import useSubmit from "../hooks/useSubmit";
import {useAlertContext} from "../context/alertContext";

const LandingSection = () => {
  const {isLoading, response, submit} = useSubmit();
  const { onOpen,onClose } = useAlertContext();

  const prevResponseRef = useRef();
console.log("landdd123",response)
  const formik = useFormik({
    initialValues: {
      firstName: "",
      email: "",
      type: "openSource",
      comment:"",
    },
    onSubmit: async (values) => {
    
      console.log("valuess", values)
       const res1=await submit("url", values);
      try {
        formik.setSubmitting(true);
       
       
        console.log("ressss", response, res1)
        
        formik.resetForm();
      }
      finally {
      
        formik.setSubmitting(false);
      }
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Reuired"),
      comment: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      type: Yup.string()
      .oneOf([ "openSource", "other","hireMe"], "Invalid type")
      .required("Type is required"),
  // ... other validation rules for form fields
}),
  });
  useEffect(() => {
    debugger;
    if (response && response !== prevResponseRef.current) {
      if (response != null) {
        if (response.type === "success") {
        onOpen("success", response.message)
          formik.resetForm();
        } else if (response.type === "error") {
          onOpen("error", response.message)
        }
      }
    }
      prevResponseRef.current = response;
  }, [response, onOpen]);
  return (
    <FullScreenSection
      isDarkBackground
      backgroundColor="#512DA8"
      py={16}
      spacing={8}
    >
      <VStack w="1024px" p={32} alignItems="flex-start">
        <Heading as="h1" id="contactme-section">
          Contact me
        </Heading>
        <Box p={6} rounded="md" w="100%">
          <form  onSubmit={formik.handleSubmit}>
            <VStack spacing={4}>
          <FormControl isInvalid={formik.touched.firstName && formik.errors.firstName}>
                <FormLabel htmlFor="firstName">Name</FormLabel>
                <Input
                  id="firstName"
                  name="firstName"
                  {...formik.getFieldProps("firstName")}
                />
                <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={formik.touched.email && formik.errors.email}>
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                    {...formik.getFieldProps("email")}
                />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="type">Type of enquiry</FormLabel>
                <Select id="type" name="type"
                   {...formik.getFieldProps("type")}
                  isInvalid={formik.touched.type && formik.errors.type}
                >
                 
                  <option value="openSource">
                    Open source consultancy session
                  </option>
                   <option value="hireMe">Freelance project proposal</option>
                  <option value="other">Other</option>
                </Select>
                <FormErrorMessage>{formik.errors.type}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={formik.touched.comment && formik.errors.comment}>
                <FormLabel htmlFor="comment">Your message</FormLabel>
                <Textarea
                  id="comment"
                  name="comment"
                  height={250}
                   {...formik.getFieldProps("comment")}
                />
                <FormErrorMessage>{formik.errors.comment}</FormErrorMessage>
              </FormControl>
              <Button type="submit" colorScheme="purple" width="full">
              {!isLoading?  "Submit" :<Spinner color='white.500'/>}
              
              </Button>
            </VStack>
              
          </form>
        </Box>
      </VStack>
    </FullScreenSection>
  );
};

export default LandingSection;
