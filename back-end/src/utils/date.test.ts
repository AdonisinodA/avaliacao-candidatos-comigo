import { DateUtils } from "./date";

describe('DateUtils', () => {
  describe('addBusinessDays', () => {
    it('deve adicionar dias úteis corretamente', () => {
      const initialDate = new Date('2024-09-12'); 
      const businessDaysToAdd = 5;
      const result = DateUtils.addBusinessDays(initialDate, businessDaysToAdd);
      
      expect(result.getUTCDate()).toBe(19); 
      expect(result.getUTCMonth()).toBe(8);
      expect(result.getUTCFullYear()).toBe(2024);
    });

    it('deve pular fins de semana ao adicionar dias úteis', () => {
      const initialDate = new Date('2024-09-15'); 
      const businessDaysToAdd = 3;
      const result = DateUtils.addBusinessDays(initialDate, businessDaysToAdd);

      expect(result.getUTCDate()).toBe(19); 
      expect(result.getUTCMonth()).toBe(8); 
      expect(result.getUTCFullYear()).toBe(2024);
    });

    it('deve funcionar com uma data próxima ao final do mês', () => {
      const initialDate = new Date('2024-09-28'); 
      const businessDaysToAdd = 2;
      const result = DateUtils.addBusinessDays(initialDate, businessDaysToAdd);

      expect(result.getUTCDate()).toBe(2); 
      expect(result.getUTCMonth()).toBe(9); 
      expect(result.getUTCFullYear()).toBe(2024);
    });
  });

  describe('formatDate', () => {
    it('deve formatar a data corretamente para dd/mm/yyyy', () => {
      const date = new Date('2024-09-12'); 
      const formattedDate = DateUtils.formatDate(date);

      expect(formattedDate).toBe('11/09/2024');
    });

    it('deve formatar uma data com dia e mês de um dígito', () => {
      const date = new Date('2024-04-03'); 
      const formattedDate = DateUtils.formatDate(date);

      expect(formattedDate).toBe('02/04/2024');
    });

    it('deve formatar corretamente no último dia do mês', () => {
      const date = new Date('2024-12-31'); 
      const formattedDate = DateUtils.formatDate(date);

      expect(formattedDate).toBe('30/12/2024');
    });
  });
});
