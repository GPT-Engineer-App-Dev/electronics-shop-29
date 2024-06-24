import { Box, SimpleGrid, Image, Text, Button, VStack, Checkbox, CheckboxGroup, Stack, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const sampleProducts = [
  { id: 1, name: "Smartphone", price: 699, category: "Electronics", brand: "BrandA", image: "/images/smartphone.jpg" },
  { id: 2, name: "Laptop", price: 999, category: "Electronics", brand: "BrandB", image: "/images/laptop.jpg" },
  { id: 3, name: "Headphones", price: 199, category: "Accessories", brand: "BrandA", image: "/images/headphones.jpg" },
];

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Products = () => {
  const [filteredProducts, setFilteredProducts] = useState(sampleProducts);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const handleCategoryChange = (categories) => {
    setSelectedCategories(categories);
  };

  const handleBrandChange = (brands) => {
    setSelectedBrands(brands);
  };

  const handlePriceChange = (value) => {
    setPriceRange(value);
  };

  useEffect(() => {
    const query = useQuery().get("search") || "";
    setFilteredProducts(
      sampleProducts.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) &&
        (selectedCategories.length === 0 || selectedCategories.includes(product.category)) &&
        (selectedBrands.length === 0 || selectedBrands.includes(product.brand)) &&
        product.price >= priceRange[0] && product.price <= priceRange[1]
      )
    );
  }, [useLocation().search]);

  return (
    <Box p={4}>
      <Box mb={4}>
        <Text fontSize="xl" fontWeight="bold">Filter by Category</Text>
        <CheckboxGroup onChange={handleCategoryChange}>
          <Stack spacing={2} direction="row">
            <Checkbox value="Electronics">Electronics</Checkbox>
            <Checkbox value="Accessories">Accessories</Checkbox>
          </Stack>
        </CheckboxGroup>
      </Box>
      <Box mb={4}>
        <Text fontSize="xl" fontWeight="bold">Filter by Brand</Text>
        <CheckboxGroup onChange={handleBrandChange}>
          <Stack spacing={2} direction="row">
            <Checkbox value="BrandA">BrandA</Checkbox>
            <Checkbox value="BrandB">BrandB</Checkbox>
          </Stack>
        </CheckboxGroup>
      </Box>
      <Box mb={4}>
        <Text fontSize="xl" fontWeight="bold">Filter by Price</Text>
        <Slider
          aria-label="price-range"
          defaultValue={[0, 1000]}
          min={0}
          max={1000}
          step={50}
          onChangeEnd={handlePriceChange}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb boxSize={6} index={0} />
          <SliderThumb boxSize={6} index={1} />
        </Slider>
        <Text>Price Range: ${priceRange[0]} - ${priceRange[1]}</Text>
      </Box>
      <SimpleGrid columns={[1, 2, 3]} spacing={10}>
        {filteredProducts.map((product) => (
          <VStack key={product.id} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
            <Image src={product.image} alt={product.name} boxSize="200px" objectFit="cover" />
            <Text fontSize="xl" fontWeight="bold">{product.name}</Text>
            <Text>{product.price}</Text>
            <Button as={Link} to={`/products/${product.id}`} colorScheme="teal">View Details</Button>
          </VStack>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Products;