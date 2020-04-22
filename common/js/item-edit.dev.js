jQuery(document).ready(function ($) {
    // @todo: merge these classes, slicker selectors
    $(document).on('click', 'li.agp-agent a', function () {
        $(this).closest('div.inside').find('li.agp-agent').removeClass('agp-selected_agent').removeClass('agp-selected_agent_colorized').addClass('agp-unselected_agent').addClass('agp-unselected_agent_colorized');
        $(this).parent().addClass('agp-selected_agent').addClass('agp-selected_agent_colorized').removeClass('agp-unselected_agent').removeClass('agp-unselected_agent_colorized');
        $(this).closest('div.inside').find('div.pp-agents > div').hide();
        presspermitShowElement(presspermitEscapeID($(this).attr('class')), $);
    });
});

// ensure selected dropdown option is styled according to its css class
jQuery(document).ready(function ($) {
    $(document).on('change', '.pp-exceptions select', function (e) {
        $(e.target.options).filter(":selected").each(function () {
            var elemclass = $(this).attr('class');
            if (elemclass)
                $(this).parent().attr('class', elemclass);
            else
                $(this).parent().attr('class', '');
        });
    });

    $(document).on('change', 'td.pp-exc-item select', function () {
        $(this).closest('tr').find('td.pp-exc-children select[disabled="disabled"]').val($(this).val()).trigger('change');
        $(this).closest('tr').find('td.pp-exc-children input[type="hidden"]').val($(this).val());
    });

    // remove search result items for agents who have item exception UI dropdowns
    $('.pp-agents-selection select').bind('jchange', function () {
        var tree = $("<div>" + $(this).html() + "</div>");

        $(this).closest('table.pp-item-exceptions-ui').find('td.pp-current-item-exceptions td input[type="hidden"]').each(function (i, item) {
            tree.find('option[value="' + $(item).val() + '"]').remove();
        });

        $(this).html(tree.html());
    });

    $('a[href="#clear-item-exc"]').click(function () {
        $(this).closest('table tbody').find('td.pp-exc-item select').val('').change();
        return false;
    });

    $('a[href="#clear-sub-exc"]').click(function () {
        $(this).closest('table tbody').find('td.pp-exc-children select').val('').change();
        return false;
    });
});