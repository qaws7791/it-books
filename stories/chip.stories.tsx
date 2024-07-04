import useBoolean from "@/src/feature/shared/hooks/use-boolean";
import {
  BottomSheets,
  BottomSheetsClose,
  BottomSheetsContent,
  BottomSheetsHandle,
  BottomSheetsTrigger,
} from "@/src/ui/components/bottom-sheets";
import Chip from "@/src/ui/components/chip";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/Chip",
  component: Chip,
  parameters: {
    docs: {
      description: {
        component:
          "Chip 컴포넌트는 Assist, Filter, Input 등 다양한 용도로 사용됩니다.",
      },
    },
  },
  tags: ["autodocs"],
  args: {
    children: "Label",
    "aria-label": "tag",
    status: "unselected",
  },
  argTypes: {
    status: {
      control: "radio",
      options: ["selected", "unselected"],
    },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Assist: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Assist 타입의 Chip은 특정 기능을 수행하거나 사용자에게 도움을 주는 역할을 합니다.",
      },
    },
  },
  render: () => (
    <Chip status={"unselected"} className="pl-2" onClick={() => alert("click")}>
      <span className="material-icons text-lg leading-none">
        calendar_today
      </span>
      Label
    </Chip>
  ),
};

export const Filter: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Filter 타입의 Chip은 사용자가 선택한 필터를 나타냅니다. 선택된 필터는 selected 상태로 표시됩니다.",
      },
    },
  },
  render: () => {
    const [selected, , toggle] = useBoolean(false);

    return (
      <Chip
        status={selected ? "selected" : "unselected"}
        onClick={toggle}
        className={selected ? "pl-2" : ""}
      >
        {selected && (
          <span className="material-icons text-lg leading-none">check</span>
        )}
        Soft
      </Chip>
    );
  },
};

export const Menu: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "다른 컴포넌트와 함께 사용되는 Menu 타입의 Chip은 사용자가 선택한 메뉴를 나타냅니다. 선택된 메뉴는 selected 상태로 표시됩니다.",
      },
    },
  },
  render: () => {
    const [menu, setMenu] = useState<string | null>(null);

    return (
      <BottomSheets>
        <BottomSheetsTrigger asChild>
          <Chip status={"unselected"} className="pl-2">
            <span className="material-icons text-lg leading-none">
              calendar_today
            </span>
            {menu ?? "카테고리"}
          </Chip>
        </BottomSheetsTrigger>
        <BottomSheetsContent height={400} duration={0.5}>
          <BottomSheetsHandle />
          <ul>
            {[
              "카테고리1",
              "카테고리2",
              "카테고리3",
              "카테고리4",
              "카테고리5",
            ].map((item) => (
              <BottomSheetsClose asChild key={item}>
                <li
                  onClick={() => {
                    setMenu(item);
                  }}
                  className="mx-auto py-4 text-center hover:bg-surface-container-high cursor-pointer"
                >
                  {item}
                </li>
              </BottomSheetsClose>
            ))}
          </ul>
        </BottomSheetsContent>
      </BottomSheets>
    );
  },
};

export const Input: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Input 타입의 Chip은 사용자가 입력한 값을 나타냅니다. 사용자가 입력한 값을 삭제할 수 있습니다.",
      },
    },
  },
  render: () => {
    const [items, setItems] = useState(["apple", "banana", "cherry"]);

    const removeItem = (index: number) => {
      setItems((previous) => previous.filter((_, index_) => index_ !== index));
    };

    return (
      <div className="flex gap-4 flex-wrap">
        {items.map((tag) => (
          <Chip key={tag} className="pr-2">
            {tag}
            <button
              className="material-icons text-on-surface text-lg leading-none cursor-pointer"
              onClick={() => removeItem(items.indexOf(tag))}
            >
              close
            </button>
          </Chip>
        ))}
      </div>
    );
  },
};
