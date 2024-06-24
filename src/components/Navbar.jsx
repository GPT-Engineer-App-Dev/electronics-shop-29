import { Box, Flex, Link, Spacer, Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
  <Box bg="teal.500" p={4}>
    <Flex maxW="1200px" mx="auto" align="center">
      <Link as={RouterLink} to="/" color="white" fontSize="xl" fontWeight="bold">Electronics Store</Link>
      <Input
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        color="white"
        variant="outline"
        mr={4}
      />
      <Spacer />
      <Button as={RouterLink} to={`/products?search=${searchQuery}`} colorScheme="teal" variant="outline" color="white">Products</Button>
    </Flex>
  </Box>
);
};

export default Navbar;