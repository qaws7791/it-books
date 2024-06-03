import {
  Table,
  TableBody,
  TableCaption,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/ui/components/table";
import type { Meta, StoryObj } from "@storybook/react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/Table",
  component: Table,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  args: {},
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const HEADERS = ["Header 1", "Header 2", "Header 3"];

const CELLS = [
  ["Row 1, Cell 1", "Row 1, Cell 2", "Row 1, Cell 3"],
  ["Row 2, Cell 1", "Row 2, Cell 2", "Row 2, Cell 3"],
];

const FOOTERS = ["Footer 1", "Footer 2", "Footer 3"];

export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>Table Caption</TableCaption>
      <TableHead>
        <TableRow>
          {HEADERS.map((header) => (
            <TableHeader key={header}>{header}</TableHeader>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {CELLS.map((row, index) => (
          <TableRow key={index}>
            {row.map((cell, index) => (
              <TableHeader key={index}>{cell}</TableHeader>
            ))}
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          {FOOTERS.map((footer) => (
            <TableHeader key={footer}>{footer}</TableHeader>
          ))}
        </TableRow>
      </TableFooter>
    </Table>
  ),
};
