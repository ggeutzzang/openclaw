import { describe, expect, it } from "vitest";
import { INSTALL_POLICY_WARNING_ACKNOWLEDGEMENT_REQUIRED } from "../../packages/gateway-protocol/src/install-policy-warning-error-details.js";
import { readInstallPolicyWarningErrorDetails } from "./install-policy-warning-error-details.js";

describe("readInstallPolicyWarningErrorDetails", () => {
  it("parses a complete warning payload", () => {
    expect(
      readInstallPolicyWarningErrorDetails({
        installPolicyCode: INSTALL_POLICY_WARNING_ACKNOWLEDGEMENT_REQUIRED,
        targetName: "demo-plugin",
        targetType: "plugin",
        requestMode: "install",
        reason: "Scanner found behavior that needs review",
        findings: [
          {
            ruleId: "dynamic-eval",
            severity: "warn",
            message: "Dynamic code execution",
            file: "index.js",
            line: 12,
          },
        ],
      }),
    ).toEqual({
      installPolicyCode: INSTALL_POLICY_WARNING_ACKNOWLEDGEMENT_REQUIRED,
      targetName: "demo-plugin",
      targetType: "plugin",
      requestMode: "install",
      reason: "Scanner found behavior that needs review",
      findings: [
        {
          ruleId: "dynamic-eval",
          severity: "warn",
          message: "Dynamic code execution",
          file: "index.js",
          line: 12,
        },
      ],
    });
  });

  it.each([
    null,
    {},
    {
      installPolicyCode: INSTALL_POLICY_WARNING_ACKNOWLEDGEMENT_REQUIRED,
      targetName: "demo-plugin",
      targetType: "plugin",
      requestMode: "install",
      reason: "",
    },
  ])("rejects malformed warning details", (value) => {
    expect(readInstallPolicyWarningErrorDetails(value)).toBeUndefined();
  });
});
