/* feedreader.js
 *
 * Tests the feed reader page
 *
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    describe('RSS Feeds', function() {

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /*
         * Ensures each feed has a URL defined and that the
         * URL is not empty.
         */
        it('has a valid url', function() {
            for (let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).toBeGreaterThan(0);
            }
        });


        /*
         * Ensure each feed has a name defined and that the
         * name is not empty.
         */
        it('has a valid name', function() {
            for (let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).toBeGreaterThan(0);
            }
        });
    });

    describe('The Menu', function() {
        let menu = $('.menu-icon-link');

        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        // Verify menu hides/shows when clicked
        it('changes properly', function() {
            menu.click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            menu.click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });


    // Test initial feed has entry
    describe('Initial Entries', function () {

        beforeEach(function (done) {
            loadFeed(0, done);
        });

        it('has at least one feed entry', function () {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    // Verify that content changes when loading a new feed
    describe('New Feed Selection', function() {
        let originalFeed = {};
        let newFeed = {};

        beforeEach(function(done) {
            loadFeed(0, function() {
                originalFeed = $('.feed').html();
                done();
            });
        });

        it('was loaded', function(done) {
            loadFeed(1, function() {
                newFeed = $('.feed').html();
                expect($('.feed').html()).not.toEqual(originalFeed);
                expect($('.feed').html()).toEqual(newFeed);
                done();
            })
        });
    });

}());
