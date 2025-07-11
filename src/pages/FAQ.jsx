import { Collapse } from "antd";
import SizedBox from "../components/SizedBox";
import NavigationBar from "../components/NavigationBar";
const items = [
  {
    key: "1",
    label: <h3>Is the exam free of cost ?</h3>,
    children:
      "No. The Registration Fee for UNOSQ is ₹130 per participant including all taxes.",
  },
  {
    key: "2",
    label: <h3>What is the registration procedure ?</h3>,
    children:
      "If Your school participates as a contingent, then the school has to register as a contingent on the UNOSQ Website, collect data and registration fees from the students and send them to us. If the students participate by themselves Individually, then they have to register directly on the UNOSQ website.",
  },
  {
    key: "3",
    label: <h3>In how many phases will the exam be conducted ?</h3>,
    children: "Exam is conducted in 2 phases and registration is open till 15th Aug.",
  },
  {
    key: "4",
    label: <h3>How will the exam be conducted ?</h3>,
    children: "Online mode",
  },
  {
    key: "5",
    label: <h3>How many students will be qualified for Phase 2 ?</h3>,
    children: "100 students from each pool",
  },
  {
    key: "6",
    label: <h3>Exam will be of which type: subjective or objective ?</h3>,
    children: "Objective MCQ questions",
  },
  {
    key: "7",
    label: <h3>In which medium will the exam be conducted ?</h3>,
    children: "English and Hindi",
  },
  {
    key: "8",
    label: <h3>How many pools are there ?</h3>,
    children: (
      <p>
        4 Pools:
        <br />
        Pool LITTLE CHAMPS - Class 5-6
        <br />
        Pool SUPER NOVA - Class 7-8
        <br />
        Pool THE TITANS - Class 9-10
        <br />
        Pool ELITE EXPLORERS - Class 11-12
        <br />
      </p>
    ),
  },
];

export default function FAQ() {
  return (
    <>
      <SizedBox>
        <NavigationBar />
        <Collapse
          items={items}
          defaultActiveKey={["1"]}
          style={{ marginBottom: 100 }}
        />
      </SizedBox>
    </>
  );
}
