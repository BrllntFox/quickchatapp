import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createNewChat,
  deleteNewChat,
  updateNewChat,
} from "@/lib/api/newChats/mutations";
import { 
  newChatIdSchema,
  insertNewChatParams,
  updateNewChatParams 
} from "@/lib/db/schema/newChats";

export async function POST(req: Request) {
  try {
    const validatedData = insertNewChatParams.parse(await req.json());
    const { newChat } = await createNewChat(validatedData);

    revalidatePath("/newChats"); // optional - assumes you will have named route same as entity

    return NextResponse.json(newChat, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json({ error: err }, { status: 500 });
    }
  }
}


export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const validatedData = updateNewChatParams.parse(await req.json());
    const validatedParams = newChatIdSchema.parse({ id });

    const { newChat } = await updateNewChat(validatedParams.id, validatedData);

    return NextResponse.json(newChat, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const validatedParams = newChatIdSchema.parse({ id });
    const { newChat } = await deleteNewChat(validatedParams.id);

    return NextResponse.json(newChat, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
