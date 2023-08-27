import SectionBox from "../../../common/Section/SectionBox";
import SectionGrid from "../../../common/Section/SectionGrid";
import Head3 from "../../../common/Heading/Head3";
import SubHead from "../../../common/Heading/SubHead";
import FormField from "../../../partials/FormField";
import ButtonAction from "../../../common/Button/ButtonAction";
import ButtonIcon from "../../../common/Button/ButtonIcon";
import { Box } from "@chakra-ui/react";
import { EmailIcon, PhoneIcon } from "@chakra-ui/icons";
const Support = () => {
  return (
    <SectionBox>
      <Head3> Need Help? Contact Support </Head3>
      <SubHead>
        We're here to help you. Please provide your information and problem
        details.
      </SubHead>
      <SectionGrid>
        <Box>
          <FormField
            id='email'
            isRequired={true}
            type={"email"}
            placeholder={"Your email"}
          >
            Email Address
          </FormField>
          <FormField
            id='issue'
            isRequired={true}
            type={"text"}
            placeholder={"Briefly describe your issue"}
          >
            Issue
          </FormField>
          <ButtonAction icon={<EmailIcon />}>Submit</ButtonAction>
        </Box>
        <Box>
          <SubHead>Or reach us directly at:</SubHead>
          <ButtonIcon icon={<PhoneIcon />}>+1 (234) 567-890</ButtonIcon>
          <ButtonIcon icon={<EmailIcon />}>support@company.com</ButtonIcon>
        </Box>
      </SectionGrid>
    </SectionBox>
  );
};

export default Support;
