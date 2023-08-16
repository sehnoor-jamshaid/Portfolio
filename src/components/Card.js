import { Heading, HStack, Image, Text, VStack,Link } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const Card = ({ title, description, imageSrc }) => {
  // Implement the UI for the Card component according to the instructions.
  // You should be able to implement the component with the elements imported above.
  // Feel free to import other UI components from Chakra UI if you wish to.
  return (
 
     <VStack
      spacing={4}
      p={0}
      border={0}
      m={0}
      borderRadius="lg"
      maxWidth="500px"
      bg="white"
      align="start" // Align items to the start
     
    >
      <Image
        src={`.${imageSrc}`}
        alt="Card Image"
        
        borderRadius="md"
        objectFit="cover"
         width="100%" // Ensure the image takes up the full width of the component
        height="100%" 
        p={0} // No padding for the image
      />
      <VStack align="start" spacing={2} p={4}  bg="white"  borderRadius="lg" >
        <Heading size="md" color="black">{ title}</Heading>
        <Text p={0} textAlign="left" color="#64748b" fontSize="md">
          {/* Description aligned to the left */}
          {description}
        </Text>
        <Link color="black" href="#" fontSize="sm" fontWeight={500}>
          See more
          <span style={{paddingLeft:"0.5rem"}}>
            <FontAwesomeIcon icon={faArrowRight} size="1x" />
          </span>
        </Link>
      </VStack>
    </VStack>
  )
};

export default Card;
