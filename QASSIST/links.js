(function (){
    function appendPopouts(){
        $('body').append(
            '<div id="qaBadge" class="qassist-badge green-good">'+
                '<div class="qassist-badge_logo"></div>'+
                '<div class="qassist-badge_text">'+
                    '<p class="qassist-badge_links">- Broken Links</p>' +
                    '<p class="qassist-badge_placeholders">- Placeholder Content</p>' +
                '</div>'+
            '</div>'+
            '<div class="qassist-descr">'+
            '<div class="qassist-descr_inner">'+
                '<div class="qassist-descr_right-arrow"></div>'+
                    '<div class="qassist-descr_body">' +
                        '<p class="qassist-descr_title bad">Links</p>'+
                        '<ul id="qaLinks" class="qassist-descr_ul bad"><li class="greyed-out">No errors</li></ul>' +
                        '<p class="qassist-descr_title warn">Placeholders</p>'+
                        '<ul id="qaPlaceholders" class="qassist-descr_ul warn"><li class="greyed-out">No warnings</li></ul>' +
                    '</div>'+
                '</div>'+
            '</div>'
        );
    }

    /**
     * ADD DATA TO UI ITEMS 
     * @param {string} type Category for message. Acceptable categories: links, placeholders.
     * @param {string} message Message to be pushed to chosen category.
     */
    function addToPopouts(type, message){
        switch(type) {
            case 'links':
                $('#qaLinks li.greyed-out').remove();
                $('#qaLinks').prepend('<li>' + message + '</li>');
                $('.qassist-badge:not(red-bad)').addClass('red-bad has-links');
                break;
            case 'placeholders':
                $('#qaPlaceholders li.greyed-out').remove();
                $('#qaPlaceholders').prepend('<li>' + message + '</li>');
                $('.qassist-badge:not(yellow-warn)').addClass('yellow-warn has-placeholders');
                break;
            default:
        }
    }

    /**
     * QA FUNCTION 1: CHECK LINKS 
     * @param {selector} pane Selector for where to search within the page. Accepts multiple selectors separated by comma.
     */
    function getDeadLinks(panes){
        var linkArr = [];
        $(panes).find('a').each(function (ind, link) {
            var aH = $(link).attr('href');
            if (aH && !aH.startsWith('mailto:') && !aH.startsWith('tel:') && !aH.startsWith('javascript') && aH.indexOf('DownloadICal.aspx') == -1){
                linkArr.push(link);
            }
        });
        checkLinks(linkArr);
    }
    function checkLinks(links){
        var xhr = new XMLHttpRequest();
        (function loopLinks(i, length){
            if (i>= length) {
                return;
            }
            var daLink = $(links[i]).attr('href');
            xhr.open("HEAD", daLink);
            xhr.onreadystatechange = function() {
                if(xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status > 400){
                        var msgStrng = '(' + xhr.status + ') <strong>"' + $(links[i]).text() + '"</strong> <span class="block qassist-descr_details"><span class="highlighted">"' + daLink + '"</span></span>';
                        addToPopouts('links', msgStrng);
                    } 
                    loopLinks(i + 1, length);
                }
            };
            xhr.send();
        })(0, links.length);
    }

    /**
     * QA FUNCTION 2: CHECK FOR PLACEHOLDER TEXT 
     * @param {selector} panes Selector for where to search within the page. Accepts multiple locations separated by comma.
     * @param {selector} elements Selector for what type of element to search within. Accepts multiple locations separated by comma.
     * @param {string} textArr Array of strings to search for within elements.
     */
    function searchText(panes, elements, textArr){
        $(panes).find(elements).each(function (ind, elem) {
            var el = $(elem).text();
            var elType = $(elem).prop('nodeName').toLowerCase();
            $(textArr).each(function(i, text){
                if (el.indexOf(text) > -1){
                    var topDist = elements !== 'text' ? '<span class="qassist-descr_subtext block">(' + elem.offsetTop + 'px from top)</span>' : '<span class="qassist-descr_subtext block">cannot get distance from top</span>';
                    var msgStrng = '<span class="block qassist-descr_subtitle">TEXT | &lt;' + elType + '&gt;:</span><span class="block qassist-descr_details"><span class="highlighted">"' + text + '"</span></span><span class="qassist-descr_subtext">' + topDist + '</span>';
                    addToPopouts('placeholders', msgStrng);
                }
            });
        });
    }

    /**
     * QA FUNCTION 3: CHECK FOR PLACEHOLDER LINKS 
     * @param {selector} panes Selector for where to search within the page. Accepts multiple locations separated by comma.
     * @param {array} hrefArr Array of href attribute values to search for.
     */
    function searchHref(panes, hrefArr){
        $(panes).find('a').each(function (ind, link) {
            var lnkTxt = $(link).text();
            var lnkHref = $(link).attr('href');
            $(hrefArr).each(function(i, href){
                if (lnkHref.indexOf(href) > -1){
                    var topDist = '<span class="block">(' + link.offsetTop + 'px from top)</span>';
                    var msgStrng = '<span class="block qassist-descr_subtitle">LINK | <span class="italic">"' + lnkTxt + '"</span>:</span><span class="block qassist-descr_details">&lt;a href=<span class="highlighted">"' + href + '"&gt;</span></span><span class="qassist-descr_subtext">' + topDist + '</span>';
                    addToPopouts('placeholders', msgStrng);
                }
            });
        });
    }

    /**
     * QA FUNCTION 4: CHECK FOR DEFAULT LOOKUP LIST VALUE 
     * @param {string} type The type of lookup list to search within.
     * @param {string} value The text value to search for within the lookup list.
     */
    function lookupList(type, value){
        var indice = (function() {
            return $.ajax({
                type: 'GET',
                url: '/feed/Lookup.svc/GetLookupList',
                data: {lookupType: type},
                contentType: 'application/json; charset=utf-8',
                dataType: 'json'
            });
        })();
        indice.fail(function() {
            console.error("No dice on that lookup list");
        }).done(function (results) {
            checkLookup(results, type, value);
        });
    }
    function checkLookup(results, type, value){
        $.each(results, function(i, llist){
            $.each(llist, function(i, ind){
                if (ind.Text == value){
                    var msgStrng = '<span class="block qassist-descr_subtitle">LOOKUP LIST | <span class="italic">"' + type + '"</span>:</span> <span class="block qassist-descr_details"><span class="highlighted">' + ind.Text + '</span></span>';
                    addToPopouts('placeholders', msgStrng);
                }
            });
        });
    }
        

    appendPopouts();

    $('.qassist-badge, .qassist-descr_right-arrow').on('click', function(){
        $('.qassist-descr').toggleClass('show');
    });

    $( window ).on('load', function() {
        getDeadLinks('.pane--content, .pane--banner, .pane--footer, .pane--footer2, .pane--credits');
        searchText('body', 'p, a, text', ['jhondoe@placeholder.com','000-0000-0000','000-000-0000','Test Item','Test Event','Test Quarterly', 'COMPANY NAME','Q4 Inc. was founded in 2006','NYSE: GDDY', 'NYSE:GDDY', 'Lorem ipsum']);
        searchHref('.pane--content, .pane--footer', ['mailto:email']);
        lookupList('indices', 'NYSE:GDDY');
    });

})();



// <link rel="stylesheet" href="http://localhost:8080/links.css">
// <script src="http://localhost:8080/links.js"></script>