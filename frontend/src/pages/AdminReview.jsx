import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Rating from "@mui/material/Rating";

const SellerPage = () => {
  const [sellers, setSellers] = useState([]);
  const [reviewsData, setReviewsData] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [reviewsError, setReviewsError] = useState(null);

  useEffect(() => {
    async function fetchSellers() {
      try {
        const response = await axios.get(
          "http://localhost:8082/api/getadminsellers"
        );
        setSellers(response.data);
      } catch (error) {
        console.error("Error fetching sellers:", error);
      }
    }

    fetchSellers();
  }, []);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await axios.get(
          `http://localhost:8082/api/review`
        );
        setReviewsData(response.data);
        console.log("revc",response.data)
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    }

    fetchReviews();
  }, []);

  const getReviewDecisions = (sellerId) => {
    const sellerReviews = reviewsData.filter((review) => review.seller_id === sellerId);
    const decisions = sellerReviews.map((review) => review.decition);
    return decisions.length > 0 ? decisions : ["No reviews found"];
  };

  const handleWarningClick = () => {
    // Add your warning button click logic here
    console.log("Warning button clicked");
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Seller Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Review Decisions</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sellers.map((seller, index) => (
              <TableRow key={index}>
                <TableCell>
                  {seller.firstName} {seller.lastName}
                </TableCell>
                <TableCell>{seller.email}</TableCell>
                <TableCell>
                  <Rating name="read-only" value={seller.rating} readOnly />
                </TableCell>
                <TableCell>
                  {getReviewDecisions(seller._id).map((decision, index) => (
                    <Typography key={index}>{decision}</Typography>
                  ))}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={handleWarningClick}
                    sx={{
                      bgcolor: "#ff6347",
                      "&:hover": {
                        bgcolor: "#E72929",
                      },
                      color: "white",
                    }}
                  >
                    Warning
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SellerPage;
