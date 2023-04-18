import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

import {
  StepConnector,
  Tooltip,
  Typography,
  stepConnectorClasses,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { StepIconProps } from "@mui/material/StepIcon";
import Check from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { statusList } from "../constants";
import LogDesc from "./LogDesc";

const StyledLine = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "green",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "green",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderWidth: 3,
  },
}));
const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
  display: "flex",
  //   cursor: "pointer",
  height: 22,
  alignItems: "center",
  ...(ownerState.active && {
    color: "green",
  }),
  "& .QontoStepIcon-completedIcon": {
    color: "green",
    zIndex: 1,
    fontSize: 30,
  },
  "& .QontoStepIcon-stopIcon": {
    color: "red",
    zIndex: 1,
    fontSize: 30,
  },
  "& .QontoStepIcon-circle": {
    width: 10,
    height: 10,
    borderRadius: "50%",
    backgroundColor: "currentColor",
    marginLeft: 8,
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className, error } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {error ? (
        <ClearIcon className="QontoStepIcon-stopIcon" />
      ) : completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

export default function OrderStatusLog({ log }) {
  const steps = [
    {
      label: "Ordered",
    },
    {
      label: "Accepted",
    },
    {
      label: "In Progress",
    },
    {
      label: "Completed",
    },
  ];

  const logLength = log.length;
  const lastLogStatus = log[logLength - 1]?.orderStatus?.status ?? "Pending";
  let lastIndex = statusList.findIndex((item) => item === lastLogStatus);

  if (lastIndex === -1) {
    steps.splice(log.length, 0, { label: lastLogStatus });
    lastIndex = log.length;
  }
  const hasError = steps.length === 5;

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper
        activeStep={lastIndex}
        orientation="vertical"
        connector={<StyledLine />}
      >
        {steps.map((step, index) =>
          index <= lastIndex && index > 0 ? (
            <Tooltip
              key={index}
              title={<LogDesc log={log[index - 1]} />}
              placement="right"
              arrow
            >
              <Step sx={{ cursor: "pointer" }}>
                <StepLabel
                  StepIconComponent={QontoStepIcon}
                  error={hasError && index == lastIndex}
                >
                  <Typography variant="h5">{step.label}</Typography>
                </StepLabel>
              </Step>
            </Tooltip>
          ) : (
            <Step key={index} sx={{ cursor: "pointer" }}>
              <StepLabel
                StepIconComponent={QontoStepIcon}
                error={hasError && index == lastIndex}
              >
                <Typography variant="h5">{step.label}</Typography>
              </StepLabel>
            </Step>
          )
        )}
      </Stepper>
    </Box>
  );
}
