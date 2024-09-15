export class DateUtils {
    private static readonly BRAZIL_TIMEZONE_OFFSET: number = -3;

    public static addBusinessDays(date: Date, businessDays: number): Date {
        let daysAdded = 0;

        while (daysAdded < businessDays) {
            date.setUTCDate(date.getUTCDate() + 1);

            const adjustedDate = new Date(date.getTime() + this.BRAZIL_TIMEZONE_OFFSET * 60 * 60 * 1000);
            const dayOfWeek = adjustedDate.getUTCDay();

            if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                daysAdded++;
            }
        }

        return date;
    }

    public static formatDate(date: Date): string {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }
}
