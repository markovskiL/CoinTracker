import { styled } from "@mui/material/styles";
import { Tab } from "@mui/material";

export const StyledTab = styled((props: StyledTabProps) => <Tab {...props} />)(
  ({ theme }) => ({
    [theme.breakpoints.up("xxs")]: {
      padding: "0 20px",
    },
    [theme.breakpoints.up("xs")]: {
      padding: "0 25px",
    },
    opacity: 1,
    textTransform: "none",
    minHeight: "fit-content",
    fontWeight: "400",
    "& .MuiSvgIcon-root": {
      fontSize: "1.9em",
      marginBottom: "3px",
    },
  })
);
interface StyledTabProps {
  label: string;
  icon: React.ReactElement;
}
