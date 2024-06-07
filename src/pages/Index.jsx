import { useState } from "react";
import { Container, VStack, Text, Input, Button, FormControl, FormLabel, Select, IconButton, HStack, Box, useToast, Textarea } from "@chakra-ui/react";
import { FaSignInAlt, FaSignOutAlt, FaPlus, FaTrash } from "react-icons/fa";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [order, setOrder] = useState({ item: "", quantity: "", address: "", invoiceDetails: "" });
  const [orders, setOrders] = useState([]);
  const toast = useToast();

  const handleLogin = () => {
    if (username === "admin" && password === "password") {
      setIsAuthenticated(true);
      toast({
        title: "Login successful.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Invalid credentials.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername("");
    setPassword("");
    toast({
      title: "Logged out.",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleOrderChange = (e) => {
    const { name, value } = e.target;
    setOrder((prevOrder) => ({ ...prevOrder, [name]: value }));
  };

  const handleAddOrder = () => {
    if (order.item && order.quantity && order.address && order.invoiceDetails) {
      setOrders((prevOrders) => [...prevOrders, order]);
      setOrder({ item: "", quantity: "", address: "", invoiceDetails: "" });
      toast({
        title: "Order added.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Please fill in all fields.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleDeleteOrder = (index) => {
    setOrders((prevOrders) => prevOrders.filter((_, i) => i !== index));
    toast({
      title: "Order deleted.",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      {!isAuthenticated ? (
        <VStack spacing={4}>
          <Text fontSize="2xl">Login</Text>
          <FormControl id="username">
            <FormLabel>Username</FormLabel>
            <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          <Button leftIcon={<FaSignInAlt />} colorScheme="teal" onClick={handleLogin}>
            Login
          </Button>
        </VStack>
      ) : (
        <VStack spacing={4} width="100%">
          <HStack justifyContent="space-between" width="100%">
            <Text fontSize="2xl">Order Supplies</Text>
            <IconButton aria-label="Logout" icon={<FaSignOutAlt />} colorScheme="red" onClick={handleLogout} />
          </HStack>
          <FormControl id="item">
            <FormLabel>Item</FormLabel>
            <Select placeholder="Select item" name="item" value={order.item} onChange={handleOrderChange}>
              <option value="Paper Tissues">Paper Tissues</option>
              <option value="Toiletry">Toiletry</option>
              <option value="Packaging">Packaging</option>
            </Select>
          </FormControl>
          <FormControl id="quantity">
            <FormLabel>Quantity</FormLabel>
            <Input type="number" name="quantity" value={order.quantity} onChange={handleOrderChange} />
          </FormControl>
          <FormControl id="address">
            <FormLabel>Address</FormLabel>
            <Textarea name="address" value={order.address} onChange={handleOrderChange} />
          </FormControl>
          <FormControl id="invoiceDetails">
            <FormLabel>Invoice Details</FormLabel>
            <Textarea name="invoiceDetails" value={order.invoiceDetails} onChange={handleOrderChange} />
          </FormControl>
          <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={handleAddOrder} mt={4}>
            Add Order
          </Button>
          <VStack spacing={2} width="100%">
            {orders.map((order, index) => (
              <HStack key={index} justifyContent="space-between" width="100%" p={2} borderWidth="1px" borderRadius="md">
                <Box>
                  <Text fontWeight="bold">{order.item}</Text>
                  <Text>Quantity: {order.quantity}</Text>
                  <Text>Address: {order.address}</Text>
                  <Text>Invoice Details: {order.invoiceDetails}</Text>
                </Box>
                <IconButton aria-label="Delete order" icon={<FaTrash />} colorScheme="red" onClick={() => handleDeleteOrder(index)} />
              </HStack>
            ))}
          </VStack>
        </VStack>
      )}
    </Container>
  );
};

export default Index;
