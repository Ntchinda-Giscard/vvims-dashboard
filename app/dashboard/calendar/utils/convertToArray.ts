export const convertToEventArray = (data: any) => {
    return data.events.map((event: { start_date: any; start_time: any; end_time: any; title: any; }, index: any) => {
        const start = `${event.start_date} ${event.start_time}`;
        const end = `${event.start_date} ${event.end_time}`;
        return {
            id: (index + 1).toString(), // Generating sequential IDs
            title: event.title,
            start,
            end,
        };
    });
};