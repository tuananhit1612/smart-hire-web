/**
 * ═══════════════════════════════════════════════════════════
 *  POST /api/interview/create-meet
 *
 *  Creates a Google Calendar event with a Google Meet conference link
 *  using a Service Account (no user OAuth needed).
 *
 *  Body: { title: string, scheduledAt: string, durationMinutes: number }
 *  Returns: { meetUrl: string, eventId: string }
 * ═══════════════════════════════════════════════════════════
 */

import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

export async function POST(req: NextRequest) {
    try {
        const { title, scheduledAt, durationMinutes = 60 } = await req.json();

        if (!scheduledAt) {
            return NextResponse.json({ error: "scheduledAt is required" }, { status: 400 });
        }

        // ── Validate env vars ─────────────────────────────
        const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
        const privateKey  = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
        const calendarId  = process.env.GOOGLE_CALENDAR_ID ?? "primary";

        if (!clientEmail || !privateKey) {
            return NextResponse.json(
                { error: "Google Calendar credentials not configured" },
                { status: 500 }
            );
        }

        // ── Auth with Service Account ─────────────────────
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: clientEmail,
                private_key: privateKey,
            },
            scopes: ["https://www.googleapis.com/auth/calendar"],
        });

        const calendar = google.calendar({ version: "v3", auth });

        // ── Calculate end time ────────────────────────────
        const startTime = new Date(scheduledAt);
        const endTime   = new Date(startTime.getTime() + durationMinutes * 60 * 1000);

        // ── Create Calendar Event with Meet conference ────
        const event = await calendar.events.insert({
            calendarId,
            conferenceDataVersion: 1,
            requestBody: {
                summary: title || "Phỏng vấn SmartHire",
                description: "Buổi phỏng vấn được tạo tự động bởi SmartHire.",
                start: {
                    dateTime: startTime.toISOString(),
                    timeZone: "Asia/Ho_Chi_Minh",
                },
                end: {
                    dateTime: endTime.toISOString(),
                    timeZone: "Asia/Ho_Chi_Minh",
                },
                conferenceData: {
                    createRequest: {
                        requestId: `smarthire-${Date.now()}`,
                        conferenceSolutionKey: { type: "hangoutsMeet" },
                    },
                },
            },
        });

        // ── Extract Meet URL from response ────────────────
        const meetUrl = event.data.conferenceData?.entryPoints?.find(
            (ep) => ep.entryPointType === "video"
        )?.uri;

        if (!meetUrl) {
            return NextResponse.json(
                { error: "Google Meet link was not generated. Make sure Google Meet is enabled for the calendar." },
                { status: 500 }
            );
        }

        return NextResponse.json({
            meetUrl,
            eventId: event.data.id,
        });

    } catch (error: any) {
        console.error("create-meet error:", error?.message ?? error);
        return NextResponse.json(
            { error: error?.message ?? "Failed to create Google Meet" },
            { status: 500 }
        );
    }
}
