import Avatar from "@/src/ui/components/avatar";
import Button from "@/src/ui/components/button";
import Card, {
  CardActions,
  CardContent,
  CardHeader,
  CardImage,
  CardSubTitle,
  CardText,
  CardTitle,
} from "@/src/ui/components/card";

import type { Meta, StoryObj } from "@storybook/react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/Card",
  component: Card,
  tags: ["autodocs"],
  args: {
    variant: "elevated",
  },
  argTypes: {
    variant: {
      control: "radio",
      options: ["elevated", "filled", "outlined"],
    },
    clickable: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (arguments_) => (
    <Card className="w-80" {...arguments_}>
      <CardHeader className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Avatar>
            <Avatar.Image src="https://via.placeholder.com/150" />
            <Avatar.Fallback>A</Avatar.Fallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <p className="font-bold">Header</p>
            <p className="text-sm">Subheader</p>
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <span className="material-icons">more_vert</span>
        </Button>
      </CardHeader>
      <CardImage
        src="https://placehold.co/360x240"
        alt="Image"
        className="rounded-none"
        width={360}
        height={240}
      />
      <CardContent>
        <CardTitle>Title</CardTitle>
        <CardSubTitle>Subtitle</CardSubTitle>
        <CardText className="mt-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor
        </CardText>

        <CardActions className="mt-8">
          <Button variant="outline">Button</Button>
          <Button>Button</Button>
        </CardActions>
      </CardContent>
    </Card>
  ),
};

export const Small: Story = {
  render: (arguments_) => (
    <Card className="w-40" {...arguments_}>
      <CardImage
        src="https://placehold.co/128x128"
        alt="Image"
        width={128}
        height={128}
      />
      <CardContent>
        <CardTitle>New Music Friday</CardTitle>
        <CardText className="mt-1">From your favorite artists</CardText>
      </CardContent>
    </Card>
  ),
};

export const Grid: Story = {
  render: (arguments_) => (
    <div className="grid grid-cols-2 gap-4 max-w-lg">
      {Array.from({ length: 4 }).map((_, index) => (
        <Card {...arguments_} key={index}>
          <CardImage
            src="https://placehold.co/128x128"
            alt="Image"
            width={128}
            height={128}
          />
          <CardContent>
            <CardTitle>New Music Friday</CardTitle>
            <CardText className="mt-1">From your favorite artists</CardText>
          </CardContent>
        </Card>
      ))}
    </div>
  ),
};
