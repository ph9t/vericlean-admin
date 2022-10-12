import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

import { styled } from "@mui/material/styles";
import { Button, Typography, Container, Box } from "@mui/material";
import Page from "../components/Page";

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

const Page404 = () => {
  const { head } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!head) {
      navigate("/login");
    }
  }, [head, navigate, dispatch]);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <Page title="404 Page Not Found aka WIP">
      <Container>
        <ContentStyle sx={{ textAlign: "center", alignItems: "center" }}>
          <Typography variant="h3" paragraph>
            Sorry, it's not there yet! :/
          </Typography>

          <Typography sx={{ color: "text.secondary" }}>
            Fret not for this site is under construction!
          </Typography>

          <Box
            component="img"
            src="/static/illustrations/illustration_404.svg"
            sx={{ height: 260, mx: "auto", my: { xs: 5, sm: 10 } }}
          />

          <Button to="/" size="large" variant="contained" component={Link} onClick={onLogout}>
            Logout
          </Button>
        </ContentStyle>
      </Container>
    </Page>
  );
};

export default Page404;
