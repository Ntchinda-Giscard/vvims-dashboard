export const convertToEventArray = (data: any) => {
    return data.events.map((event, index) => {
        const start = `${event.start_date}T${event.start_time}`;
        const end = `${event.start_date}T${event.end_time}`;
        return {
            id: (index + 1).toString(), // Generating sequential IDs
            title: event.title,
            start,
            end,
        };
    });
};