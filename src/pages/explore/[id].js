import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Container, Stack, Typography, Box } from "@mui/material";
import { Image } from "next/image";

const PlantDetailPage = () => {
  const [plant, setPlant] = useState({});
  const router = useRouter();

  useEffect(() => {
    async function fetchPlant() {
      const id = router.query.id;
      fetch(`/api/explore/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setPlant(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    fetchPlant();
  }, [router.query.id]);

  return (
    <>
      <Navbar />
      <Container>
        <Stack alignItems="center" spacing={4} p={4}>
          <Typography variant="h2" color={"primary.dark"}>
            Plant Details
          </Typography>
          <hr className="bar" />
          {plant.data && (
            <>
              <Typography variant="h3">{plant.data.common_name}</Typography>
              <Typography variant="h4" color={"#446652"}>
                {plant.data.scientific_name}
              </Typography>
              <Typography variant="p" color={"#446652"}>
                ID#: {plant.data.id}
              </Typography>
              <Stack direction={"row"}>
                <img src={plant.data.image_url ? plant.data.image_url : "../../../public/GroWiseLogo.png"} alt="image of {plant.data.common_name}" />
                {/* <Image
                  src={plant.data.image_url ? plant.data.image_url : "../../../public/GroWiseLogo.png"}
                  alt="image of {plant.data.common_name}"
                  width={300}
                  height={300}
                  placeholder="blur"
                ></Image> */}
                <div className="idDetailsDiv">
                  <Typography variant="h5">
                    <u>Family:</u> {plant.data.main_species.family_common_name ? plant.data.main_species.family_common_name : "Not Available"}
                  </Typography>
                  <Typography variant="h5">
                    <u>Genus:</u> {plant.data.main_species.genus}
                  </Typography>
                </div>
              </Stack>
            </>
          )}
        </Stack>
      </Container>
      <Footer />
    </>
  );
};

export default PlantDetailPage;
