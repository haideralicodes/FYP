import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Alert,
  Box,
  Input,
  CircularProgress,
} from "@mui/material";

const FindDomain = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState(false);

  const [purchaseMessage, setPurchaseMessage] = useState("");
  const [error, setError] = useState('An error occurred!');

  const handleSearch = async () => {
    if (!searchTerm) {
      setError("Please enter a domain name");
      return;
    }

    setError(""); // Clear error on new search
    setLoading(true); // Set loading to true

    try {
      const response = await axios.get("http://localhost:4000/api/domains/available", {
        params: { domain: searchTerm },
      });

      // Check if the domain is available
      if (response.data && response.data.available) {
        setDomains([{
            domain: response.data.domain,
            price: response.data.price
          }]);
      } else {
        setDomains([]);
        setError("Domain is not available");
      }

      console.log(response.data.domain)
      console.log(response.data.price)

    } catch (err) {
      console.error("Error fetching domain information:", err);
      setError("An error occurred while fetching the domain information.");
    } finally {
      setLoading(false); // Set loading to false after request
    }
  };

  
  const handlePurchase = async (domainName) => {
    try {
        console.log("Domain Name: ", domainName)
        const purchaseResponse = await axios.post("http://localhost:4000/api/domains/purchase",{
            domain: domainName,
            consent: {
                agreedAt: new Date().toISOString(),
                agreedBy: "127.0.0.1", // Replace with actual user's IP if needed
                agreementKeys: ["DNRA"]
              },
              contactRegistrant: {
                nameFirst: "John",
                nameLast: "Doe",
                email: "john.doe@gmail.com",
                phone: "+123.4567890123",
                addressMailing: {
                  address1: "123 Main St",
                  address2: "",
                  city: "Anytown",
                  state: "CA",
                  postalCode: "12345",
                  country: "US"
                }
              },
              contactAdmin: {
                nameFirst: "Jane",
                nameLast: "Doe",
                email: "jane.doe@gmail.com",
                phone: "+123.4567890123",
                addressMailing: {
                  address1: "456 Another St",
                  address2: "",
                  city: "Othertown",
                  state: "CA",
                  postalCode: "67890",
                  country: "US"
                }
              },
              contactBilling: {
                nameFirst: "Bill",
                nameLast: "Smith",
                email: "bill.smith@gmail.com",
                phone: "+123.4567890123",
                addressMailing: {
                  address1: "789 Billing Ave",
                  address2: "",
                  city: "Billtown",
                  state: "CA",
                  postalCode: "54321",
                  country: "US"
                }
              },
              contactTech: {
                nameFirst: "Alice",
                nameLast: "Johnson",
                email: "alice.johnson@gmail.com",
                phone: "+123.4567890123",
                addressMailing: {
                  address1: "321 Tech Blvd",
                  address2: "",
                  city: "Techtown",
                  state: "CA",
                  postalCode: "98765",
                  country: "US"
                }
              },
              nameServers: ["ns1.godaddy.com", "ns2.godaddy.com"], // Optional
              period: 1, // Number of years to register the domain
              privacy: false,
              renewAuto: true,
            }
        );
  
        if (purchaseResponse.status === 200) {
            setPurchaseMessage(`Domain ${domainName} purchased successfully!`);
        } else {

        setPurchaseMessage("Failed to purchase domain.");
        }
    } catch (error) {
        console.error("Error purchasing domain:", error);
        setPurchaseMessage("Error occurred while purchasing the domain.");
        }
    };
  
  

  return (
    <Box sx={{ boxShadow: '0px 20px 30px 10px rgba(0,0,0,0.1)', margin:"auto", width:"78vw", height:"90.5vh", padding: 3, backgroundColor:"#E6FBFF", borderTopRightRadius:"30px", borderTopLeftRadius:"30px"}}>
      <Typography variant="h1" sx={{ color:"black", fontSize:"80px", margin:"auto", textAlign:"center", mb:6, mt:5, width:"700px"}}>Search the perfect domain name</Typography>
        <Box sx={{ boxShadow: '0px 20px 30px 10px rgba(0,0,0,0.1)', border:"1px solid black", backgroundColor:"white", height:"80px", pl:5, pr:1, width:"50vw", margin:"auto", borderRadius:"50px", display:"flex", alignItems:"center", gap:"30px", justifyContent:"space-between"}}>
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter domain name (e.g., mysite.com)"
              sx={{ marginTop: 0, width:"700px",  fontSize:"17px", color:"black", "& .MuiOutlinedInput-root": {
                borderRadius: "30px", pl:9,
            }}}
            />
            <Button sx={{boxShadow: '0px 20px 30px 10px rgba(0,0,0,0.1)', backgroundColor: "black", color:"white", width:"210px", height:"65px", fontSize:"17px", fontWeight:"550", borderRadius:"70px", transition:"0.5s ease-in-out",
                ":hover":{
                    backgroundColor: "#000000",
                    color:"white",
                }
                }} onClick={handleSearch}>Search
                <lord-icon
                    src="https://cdn.lordicon.com/vduvxizq.json"
                    trigger="loop"
                    delay="1000"
                    colors="primary:#ffffff"
                    style={{height:"40px", width:"50px"}}>
                </lord-icon>
            </Button>
        </Box>

        {/* Display loading animation below the input box */}
        {loading && (
          <Box sx={{ display: 'flex', alignItems:"center", justifyContent: 'center', mt: 5, gap:"20px" }}>
            {/* <Typography variant="h1" sx={{ color:"black", fontSize:"40px"}}>Searching</Typography> */}
            <lord-icon
              src="https://cdn.lordicon.com/lqxfrxad.json"
              trigger="loop"
              state="loop-expand-alt-2"
              colors="primary:#000000"
              style={{ height: "60px", width: "60px" }}>
            </lord-icon>
          </Box>
        )}

        <Box sx={{margin:"auto", width:"49vw", mt:5}}>
            {error && <Alert variant="filled" severity="error"
            onClose={() => setError(null)}
            sx={{ 
              borderRadius: '8px',         // Rounded corners
              fontSize: '16px',            // Font size
              padding: '10px',             // Padding
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Optional shadow for depth
              mt: 2,                       // Add margin-top (2 spacing units)
            }}>{error}</Alert>}
        </Box>

        <Box sx={{p:3, width:"50vw", margin:"auto", mt:6}}>
            {domains.length > 0 ? (
                <Box>
                    {domains.map((domainData, index) => (
                        <Box sx={{display:"flex", flexDirection:"column", alignItems:"center"}} key={index}>
                            <Box sx={{ width:"760px", backgroundColor:"#000000", height:"1.1px"}}></Box>
                                <Box sx={{mt:3, display:"flex", alignItems:"center", gap:"65px"}}>
                                    <Typography variant="h5" sx={{mt:1, fontSize:"19px", fontWeight:"600"}}>{domainData.domain}</Typography>
                                    <Typography variant="h5" sx={{mt:1, ml: 10, fontSize:"19px", width:"200px", fontWeight:"550"}}>{`${domainData.price} $`}</Typography>
                                    <Button sx={{backgroundColor: "transparent", color:"black",  border:"1px solid black", width:"170px", height:"48px", fontSize:"17px", fontWeight:"550", borderRadius:"70px", transition:"0.5s ease-in-out", 
                                        ":hover":{backgroundColor:"black", color:"white"}
                                        }} onClick={() => handlePurchase(domainData.domain)}>Available
                                    </Button>
                                </Box>
                            <Box sx={{ mt:3, width:"760px", backgroundColor:"#000000", height:"0.5px"}}></Box>
                        </Box>
                    ))}
                </Box>
                    ) : (
            <Typography></Typography>
            )}
        </Box>
    </Box>
  );
};

export default FindDomain;
