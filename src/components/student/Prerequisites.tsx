import DoneIcon from "@mui/icons-material/Done";
import { Chip, Container, Grid, Paper, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Prerequisite, prerequisites } from "../../constants/prerequisites";

export default function Prerequisites() {
  const params = useParams();

  const [savedPrerequisites, setSavedPrerequisites] = useState(prerequisites);

  const handleClick = (preId: number) => {
    setSavedPrerequisites(
      savedPrerequisites.map((pre) =>
        pre.id === preId ? { ...pre, answer: !pre.answer } : pre
      )
    );
  };

  if (!prerequisites || prerequisites.length === 0)
    return (
      <Typography component="h2" variant="h5" color="primary" gutterBottom>
        No Prerequisites Available.
      </Typography>
    );

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        <Grid container spacing={3} columns={1}>
          <Grid item xs={12}>
            <Typography
              component="h2"
              variant="h5"
              color="primary"
              gutterBottom
            >
              Prerequisites - Graduation Project {params["projectType"]}
            </Typography>
            <Table size="medium">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontSize: 16 }}>Prerequisite</TableCell>
                  <TableCell align="right" sx={{ fontSize: 16 }}>
                    Answer
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {savedPrerequisites.map((prerequisite, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ fontSize: 16 }}>
                      {prerequisite.content}
                    </TableCell>
                    <TableCell align="right" sx={{ fontSize: 16 }}>
                      {prerequisite.answer && (
                        <Chip
                          color="success"
                          icon={<DoneIcon />}
                          size="small"
                          variant="filled"
                          label="Yes"
                          sx={{
                            fontSize: "14px",
                          }}
                        />
                      )}
                      <Checkbox
                        name={`${index}`}
                        onClick={() => handleClick(prerequisite.id)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
                {savedPrerequisites.length >= 1 &&
                savedPrerequisites.every(
                  (p: Prerequisite) => p.answer === true
                ) ? (
                  <TableRow key={0}>
                    <TableCell
                      sx={{
                        fontSize: "18px",
                        fontWeight: "600",
                        fontFamily: "Segoe UI Emoji",
                      }}
                    >
                      {"You've completed all the Prerequisties!"} <br />
                      Do you want to register Graduation Project {"1 " || "2 "}
                      this semester?
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        color="success"
                        sx={{ fontSize: 16 }}
                      >
                        Yes, Register
                      </Button>
                    </TableCell>
                  </TableRow>
                ) : null}
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
