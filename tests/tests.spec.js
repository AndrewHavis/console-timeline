'use strict';

define(['jquery'], () => {

    describe('Twitter API', () => {
    
        it('must get the user\'s tweets', () => {
            $.get('/api/twitter/user/tweets', (data) => {
                expect(data.length).toBeGreaterThan(0);
            });
        });
    
    });

});