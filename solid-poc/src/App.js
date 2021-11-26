import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(
  (theme) => ({
    panel: {
      border: "1px solid #005b81",
      borderRadius: "4px",
      boxShadow: "rgb(184, 196, 194) 0px 4px 10px -4px",
      boxSizing: "border-box",
      padding: "1rem 1.5rem",
      margin: "1rem 1.2rem 1rem 1.2rem",
      background: "white",
    },

    display: {
      marginLeft: "1rem",
      color: "gray",
      display: "grid",
      gridTemplateColumns: "max-content auto",
    },
  }),
  { index: 1 }
);

export default useStyles;
