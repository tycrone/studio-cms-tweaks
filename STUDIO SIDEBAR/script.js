(function (){

    function setPageEditUrl() {
        var itemId = urlParams.get('SectionId'),
            sectionId = 'f6d80133-c225-4a4e-aa62-d96e8cb2ac66';

        if (urlParams.get('PressReleaseId')) {
            itemId = urlParams.get('PressReleaseId');
            sectionId = 'a9a908cb-21fa-46a6-8de1-05e23027c007';
        } else if (urlParams.get('EventId')) {
            itemId = urlParams.get('EventId');
            sectionId = 'a8a3d569-db57-40e4-b845-9fd6c267b0b3';
        }
        return "../admin/default.aspx?ItemID=" + itemId + "&LanguageId=" + languageId + "&SectionId=" + sectionId;
    }

    function appendStudioSidebar(){
        $('body').append(
            '<div id="studioSidebar" class="studio-sidebar">'+
                '<div class="studio-sidebar_logo"></div>'+
                '<div class="studio-sidebar_content">'+
                    '<div class="studio-sidebar_extension">'+
                        '<div class="studio-sidebar_extension-header">'+
                            '<img src="/files/design/studio-sidebar_content-main.png">' +
                            '<hr/>'+
                        '</div>'+
                        '<a title="Financial Report List" target="_blank" class="studio-sidebar_a" href="../admin/default.aspx?LanguageId=' + languageId + '&SectionId=a485c91e-b42c-4337-aa04-dce8806e2f07">'+
                            '<img src="/files/design/studio-sidebar_content-financials2.png">' +
                        '</a>'+
                        '<a title="Events" target="_blank" class="studio-sidebar_a" href="../admin/default.aspx?LanguageId=' + languageId + '&SectionId=044fae0a-869c-4ca8-912b-be1a292400c0">'+
                            '<img src="/files/design/studio-sidebar_content-events.png">' +
                        '</a>'+
                        '<a title="Presentation List" target="_blank" class="studio-sidebar_a" href="../admin/default.aspx?LanguageId=' + languageId + '&SectionId=d67c52db-ae0f-44ef-b62c-e2c8946192d6">'+
                            '<img src="/files/design/studio-sidebar_content-presentations.png">' +
                        '</a>'+
                        '<a title="News (Press Releases)" target="_blank" class="studio-sidebar_a" href="../admin/default.aspx?LanguageId=' + languageId + '&SectionId=de305d4f-2c81-4acf-975a-b859e43248c8">'+
                            '<img src="/files/design/studio-sidebar_content-news.png">' +
                        '</a>'+
                        '<a title="Download List" target="_blank" class="studio-sidebar_a" href="../admin/default.aspx?LanguageId=' + languageId + '&SectionId=184b727d-3857-4ca6-b4fc-6436fb81ca30">'+
                            '<img src="/files/design/studio-sidebar_content-downloads.png">' +
                        '</a>'+
                        '<a title="FAQ List" target="_blank" class="studio-sidebar_a" href="../admin/default.aspx?LanguageId=' + languageId + '&SectionId=6584af41-0d20-43ea-bb53-770a526ad11e">'+
                            '<img src="/files/design/studio-sidebar_content-faq.png">' +
                        '</a>'+
                    '</div>'+
                    '<div class="studio-sidebar_content-inner">'+
                        '<a title="Edit Page" target="_blank" class="studio-sidebar_a" href="' + pageEditUrl + '">'+
                            '<img src="/files/design/studio-sidebar_edit.png">' +
                        '</a>'+
                        '<a title="CSS File List" target="_blank" class="studio-sidebar_a" href="../admin/default.aspx?SectionId=88bf4698-300d-4c41-aa6b-822a4096f2ea">'+
                            '<img src="/files/design/studio-sidebar_css.png">' +
                        '</a>'+
                        '<a title="Global Module List" target="_blank" class="studio-sidebar_a" href="../admin/default.aspx?LanguageId=' + languageId + '&SectionId=b45b53c6-13a3-4792-bf85-01f0439f7811">'+
                            '<img src="/files/design/studio-sidebar_globals.png">' +
                        '</a>'+
                        '<a title="Site List" target="_blank" class="studio-sidebar_a" href="../admin/default.aspx?ItemID=397e33da-8959-43c5-afeb-b035c1681adc&SectionId=654a9068-0af5-410b-b2f9-782406c95740">'+
                            '<img src="/files/design/studio-sidebar_sitelist.png">' +
                        '</a>'+
                        '<a title="Pages" target="_blank" class="studio-sidebar_a" href="../admin/studio/#/?pageMenuOpen=true">'+
                            '<img src="/files/design/studio-sidebar_pages.png">' +
                        '</a>'+
                        '<a title="Dashboard" target="_blank" class="studio-sidebar_a" href="../admin/default.aspx?LanguageId=' + languageId + '&SectionId=d347388f-84b9-4d3e-9921-59a5d9ee0ea5">'+
                            '<img src="/files/design/studio-sidebar_dashboard.png">' +
                        '</a>'+
                    '</div>'+
                    
                '</div>'+
            '</div>'
        );
    }

    if (location.hostname.indexOf('s4.q4web.com') > -1){
        var urlParams = new URLSearchParams(window.location.search),   
            languageId = urlParams.get('LanguageId'),
            pageEditUrl = setPageEditUrl();

        appendStudioSidebar();
    }

})();