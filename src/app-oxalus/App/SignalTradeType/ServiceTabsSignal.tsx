import ServiceListSignal from "./ServiceListSignal";
import { SignalToday } from "./Signal/SIgnalToday";
import { SignalActive } from "./Signal/SignalActive";
import { SignalCutlos } from "./Signal/SignalCutlos";
import { SignalExpired } from "./Signal/SignalExpired";
import { SignalProfit } from "./Signal/SignalProfit";

const itemsTabs = [
  {
    id: 1,
    title: "Active",
    key: "signal-active",
    content: <SignalActive />,
  },
  {
    id: 2,
    title: "Expired",
    key: "signal-expired",
    content: <SignalExpired />,
  },
  {
    id: 3,
    title: "Profit",
    key: "signal-profit",
    content: <SignalProfit />,
  },
  {
    id: 4,
    title: "Cutloss",
    key: "signal-cutlos",
    content: <SignalCutlos />,
  },
  {
    id: 5,
    title: "All",
    key: "signal-today",
    content: (
      <div className="mt-3">
        <ServiceListSignal />
      </div>
    ),
  },
];

export { itemsTabs };
