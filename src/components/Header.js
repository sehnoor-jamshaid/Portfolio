import React, { useEffect, useRef ,useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Link } from '@chakra-ui/react'
import {
  faGithub,
  faLinkedin,
  faMedium,
  faStackOverflow,
} from "@fortawesome/free-brands-svg-icons";
import { Box, HStack } from "@chakra-ui/react";

const socials = [
  {
    icon: faEnvelope,
    url: "mailto: hello@example.com",
  },
  {
    icon: faGithub,
    url: "https://github.com",
  },
  {
    icon: faLinkedin,
    url: "https://www.linkedin.com",
  },
  {
    icon: faMedium,
    url: "https://medium.com",
  },
  {
    icon: faStackOverflow,
    url: "https://stackoverflow.com",
  },
];

const Header = () =>{
 const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const headerRef = useRef(null);

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;

    if (prevScrollPos > currentScrollPos) {
      setIsHeaderVisible(true);
    } else {
      setIsHeaderVisible(false);
    }

    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  const headerStyle = {
    transform: `translateY(${isHeaderVisible ? '0' : '-200px'})`,
    transition: 'transform 0.5s ease-in-out',
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
  };

  const handleClick = (anchor) => () => {
    const id = `${anchor}-section`;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
   <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      translateY={0}
      transitionProperty="transform"
      transitionDuration=".3s"
      transitionTimingFunction="ease-in-out"
      backgroundColor="#18181b"
      style={headerStyle}
      ref={headerRef}
    >
      <Box color="white" maxWidth="1280px" margin="0 auto">
        <HStack
          px={16}
          py={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <nav>
            {/* Add social media links based on the `socials` data */}
            {
              socials.map((val, ind) =>
              (
              
                  <Link href={val.url} key={ind} style={{marginRight:'0.5rem',marginLeft:'0.5rem'}}>
                     <FontAwesomeIcon icon={val.icon} key={val.icon} size="2x" ></FontAwesomeIcon>
                 </Link>
               
              ))
            }
          </nav>
          <nav>
            <HStack spacing={8}>
              {/* Add links to Projects and Contact me section */}
                <Link  href={' /#projects'} onClick={handleClick('projects')}>
                 Projects
              </Link>
                <Link  href={'/#contact-me'} onClick={handleClick('contactme')}>
                  Contact Me
              </Link>
            </HStack>
          </nav>
        </HStack>
      </Box>
    </Box>

   
  );
};
export default Header;
