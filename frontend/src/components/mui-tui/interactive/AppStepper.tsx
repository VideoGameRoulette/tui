'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material/styles';

export interface StepItem {
  label: string;
  description?: string;
  content?: ReactNode;
  optional?: boolean;
}

export interface AppStepperProps {
  steps: StepItem[];
  activeStep?: number;
  defaultActiveStep?: number;
  onChange?: (step: number) => void;
  orientation?: 'horizontal' | 'vertical';
  alternativeLabel?: boolean;
  nonLinear?: boolean;
  showNavButtons?: boolean;
  onFinish?: () => void;
  sx?: SxProps<Theme>;
}

export default function AppStepper({
  steps,
  activeStep: controlledStep,
  defaultActiveStep = 0,
  onChange,
  orientation = 'horizontal',
  alternativeLabel = false,
  nonLinear = false,
  showNavButtons = true,
  onFinish,
  sx,
}: AppStepperProps) {
  const isControlled = controlledStep !== undefined;
  const [internal, setInternal] = useState(defaultActiveStep);
  const active = isControlled ? controlledStep : internal;

  function setStep(next: number) {
    if (!isControlled) setInternal(next);
    onChange?.(next);
  }

  function handleNext() {
    if (active >= steps.length - 1) {
      onFinish?.();
    } else {
      setStep(active + 1);
    }
  }

  function handleBack() {
    setStep(Math.max(0, active - 1));
  }

  const vertical = orientation === 'vertical';

  return (
    <Box sx={sx}>
      <Stepper
        activeStep={active}
        orientation={orientation}
        alternativeLabel={!vertical && alternativeLabel}
        nonLinear={nonLinear}
      >
        {steps.map((step, i) => (
          <Step key={i} completed={nonLinear ? undefined : active > i}>
            <StepLabel
              optional={step.optional ? <Typography variant="caption">Optional</Typography> : undefined}
              onClick={nonLinear ? () => setStep(i) : undefined}
              sx={nonLinear ? { cursor: 'pointer' } : undefined}
            >
              {step.label}
            </StepLabel>

            {/* Vertical: content inside StepContent */}
            {vertical && (
              <StepContent>
                {step.description && (
                  <Typography variant="body2" color="text.secondary" mb={step.content ? 2 : 0}>
                    {step.description}
                  </Typography>
                )}
                {step.content}
                {showNavButtons && (
                  <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                    <Button
                      variant="contained"
                      disableElevation
                      size="small"
                      onClick={handleNext}
                    >
                      {i === steps.length - 1 ? 'Finish' : 'Continue'}
                    </Button>
                    {i > 0 && (
                      <Button size="small" onClick={handleBack}>
                        Back
                      </Button>
                    )}
                  </Box>
                )}
              </StepContent>
            )}
          </Step>
        ))}
      </Stepper>

      {/* Horizontal: content + nav below stepper */}
      {!vertical && (
        <Box sx={{ mt: 3 }}>
          {active < steps.length ? (
            <>
              {steps[active].description && (
                <Typography variant="body2" color="text.secondary" mb={2}>
                  {steps[active].description}
                </Typography>
              )}
              {steps[active].content}
            </>
          ) : (
            <Typography color="success.main" fontWeight={600}>
              All steps completed.
            </Typography>
          )}

          {showNavButtons && (
            <Box sx={{ display: 'flex', gap: 1, mt: 3 }}>
              <Button
                disabled={active === 0}
                onClick={handleBack}
                variant="outlined"
                size="small"
              >
                Back
              </Button>
              <Button
                variant="contained"
                disableElevation
                size="small"
                onClick={handleNext}
                disabled={active >= steps.length}
              >
                {active === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}
