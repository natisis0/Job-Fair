import db from "./db";

export const getEvents = async (filter = "weekdays") => {
  try {
    let query = "SELECT * FROM public.events WHERE status = 'active'";
    let orderBy = "ORDER BY event_date ASC";

    if (filter === "popular") {
      orderBy = "ORDER BY participants_count DESC";
    } else if (filter === "latest") {
      orderBy = "ORDER BY created_at DESC";
    } else if (filter === "weekdays") {
      // Monday to Friday
      query += " AND EXTRACT(DOW FROM event_date) BETWEEN 1 AND 5";
      orderBy = "ORDER BY event_date ASC";
    }

    const result = await db.query(`${query} ${orderBy}`);
    return result.rows;
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};

export const getEventById = async (id) => {
  try {
    const result = await db.query("SELECT * FROM public.events WHERE id = $1", [
      id,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching event by id:", error);
    return null;
  }
};

export const getLatestEvents = async (filter = "latest") => {
  try {
    let query = "SELECT * FROM public.events WHERE status = 'active'";
    let orderBy = "ORDER BY created_at DESC";

    if (filter === "popular") {
      orderBy = "ORDER BY participants_count DESC";
    } else if (filter === "weekdays") {
      // Monday to Friday
      query += " AND EXTRACT(DOW FROM event_date) BETWEEN 1 AND 5";
      orderBy = "ORDER BY event_date ASC";
    }

    const result = await db.query(`${query} ${orderBy} LIMIT 9`);
    return result.rows;
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};

export const getCompaniesByEventId = async (eventId) => {
  try {
    const result = await db.query(
      `SELECT c.* 
       FROM public.companies c
       JOIN public.event_companies ec ON ec.company_id = c.id
       WHERE ec.event_id = $1 AND c.status = 'active'
       ORDER BY c.name ASC`,
      [eventId],
    );
    return result.rows;
  } catch (error) {
    console.error("Error fetching companies for event:", error);
    return [];
  }
};

export const getSpeakersByEventId = async (eventId) => {
  try {
    const result = await db.query(
      ` SELECT *
         FROM speakers
         WHERE event_id = $1
         ORDER BY name ASC`,
      [eventId],
    );
    return result.rows;
  } catch (error) {
    console.error("Error fetching speakers for event:", error);
    return [];
  }
};

export const getEventPhotosByEventId = async (eventId) => {
  try {
    const result = await db.query(
      ` SELECT *
         FROM event_photos
         WHERE event_id = $1
         `,
      [eventId],
    );
    return result.rows;
  } catch (error) {
    console.error("Error fetching event photos for event:", error);
    return [];
  }
};
