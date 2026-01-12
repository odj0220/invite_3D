import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { InvitationInput } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body: InvitationInput = await request.json();

    const { data, error } = await supabase
      .from("invitations")
      .insert([body])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create invitation" },
      { status: 500 }
    );
  }
}
