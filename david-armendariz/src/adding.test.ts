export function sum(a: number, b: number): number {
    if (a < 0 && b < 0) {
        throw new Error("Fail");
    }
    return a + b;
}

describe('when a,b are positive', () => {
    test('should return the right answer', () => {
        expect(sum(1, 2)).toBe(3);
    })
});

describe('when sum are negative', () => {
    test('should give error', () => {
        let error;
        try {
            sum(-1, -4);
        } catch (err) {
            error = err;
        }
        expect(error).toBeDefined();
        expect(error.message).toBe('Fail');
    })
    
})

