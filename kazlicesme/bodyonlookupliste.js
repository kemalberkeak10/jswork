$(function() {
    var parentCustomObjectId = $('#CustomObjectPublicId').val(),
        token = $('input[name=__RequestVerificationToken]').val();

    $('body').on('click', '.btn-inline-lookup-relations', function() {
        var $this = $(this),
            parentRecordId = $this.closest('td').data("id"),
            $thisTr = $this.closest('tr'),
            detailRowId = String.format('detailRow-{0}', parentRecordId),
            detailRow = $('#' + detailRowId),
            colspanCount = parseInt($('#ColumnCount').val()) + 2,
            relationId = $this.closest('td').data("relationid");

        //$this.find('i').toggleClass("fa-arrow-down fa-arrow-up");

        if (detailRow.length > 0) {
            detailRow.toggle();
            return;
        }

        $thisTr.after($('<tr/>', { id: detailRowId, 'data-id': relationId }).append($('<td/>', { colspan: colspanCount, 'class': 'btn-success', style: 'padding:10px;' }).append($('<div/>', { 'class': 'panelBody', style: 'width:97%;margin-left:3%;' }))));
        detailRow = $('#' + detailRowId);
        load.lookupDetail(detailRow, 1, "", parentRecordId, relationId, "");

        $('body #detailRow-' + parentRecordId).on('click', '.gotoFirst', function(e) {
            e.preventDefault();
            var parent = $(this).closest('.col-md-offset-4'),
                panel = detailRow,
                panelFilter = parent.data('viewfilterid'),
                relationId = panel.data('id');

            if ($('#search-' + relationId + '-' + parentRecordId).length) {
                load.lookupDetail(panel, 1, $('#search-' + relationId + '-' + parentRecordId).val(), parentRecordId, relationId, panelFilter);
            } else {
                load.lookupDetail(panel, 1, "", parentRecordId, relationId, panelFilter);
            }
        });

        $('body #detailRow-' + parentRecordId).on('click', '.gotoPrev', function(e) {
            e.preventDefault();
            var parent = $(this).closest('.col-md-offset-4'),
                panel = detailRow,
                panelFilter = parent.data('viewfilterid'),
                relationId = panel.data('id');

            if ($('#search-' + relationId + '-' + parentRecordId).length) {
                load.lookupDetail(panel, parent.data('page') - 1, $('#search-' + relationId + '-' + parentRecordId).val(), parentRecordId, relationId, panelFilter);
            } else {
                load.lookupDetail(panel, parent.data('page') - 1, "", parentRecordId, relationId, panelFilter);
            }
        });

        $('body #detailRow-' + parentRecordId).on('click', '.gotoNext', function(e) {
            e.preventDefault();
            var parent = $(this).closest('.col-md-offset-4'),
                panel = detailRow,
                panelFilter = parent.data('viewfilterid'),
                relationId = panel.data('id');

            if ($('#search-' + relationId + '-' + parentRecordId).length) {
                load.lookupDetail(panel, parent.data('page') + 1, $('#search-' + relationId + '-' + parentRecordId).val(), parentRecordId, relationId, panelFilter);
            } else {
                load.lookupDetail(panel, parent.data('page') + 1, "", parentRecordId, relationId, panelFilter);
            }
        });

        $('body #detailRow-' + parentRecordId).on('click', '.gotoLast', function(e) {
            e.preventDefault();
            var parent = $(this).closest('.col-md-offset-4'),
                panel = detailRow,
                panelFilter = parent.data('viewfilterid'),
                relationId = panel.data('id');

            if ($('#search-' + relationId + '-' + parentRecordId).length) {
                load.lookupDetail(panel, parent.data('pagecount'), $('#search-' + relationId + '-' + parentRecordId).val(), parentRecordId, relationId, panelFilter);
            } else {
                load.lookupDetail(panel, parent.data('pagecount'), "", parentRecordId, relationId, panelFilter);
            }
        });

        $('body #detailRow-' + parentRecordId).on('keyup', '.goToPage', function(e) {
            var code = parseInt(e.keyCode || e.which);
            if (code === 13) {
                var panel = detailRow,
                    panelFilter = parent.data('viewfilterid'),
                    relationId = panel.data('id');

                if ($('#search-' + relationId + '-' + parentRecordId).length) {
                    load.lookupDetail(panel, $(this).val(), $('#search-' + relationId + '-' + parentRecordId).val(), parentRecordId, relationId, panelFilter);
                } else {
                    load.lookupDetail(panel, $(this).val(), "", parentRecordId, relationId, panelFilter);
                }
            }
        });


        $('body #detailRow-' + parentRecordId).on('click', '.new-lookuprow', function(e) {
            e.stopPropagation();
            var panel = detailRow,
                body = panel.find('.panelBody'),
                panelFilter = $(this).data('viewfilterid'),
                relationId = panel.data('id');

            if (body.data('isaddinline') === true) {
                body.find('table .btn').addClass('disabled');
                var lookupItemRow = body.find('.lookup-item-tr');
                var editableRow = lookupItemRow.clone();

                body.find('table tbody').prepend(editableRow);

                var parentId = body.data('fieldid');
                var parentItem = $('<input/>', { 'id': parentId, 'name': parentId, 'type': 'hidden', 'value': parentRecordId });
                editableRow.find('td:first').append($('<div/>', { 'class': 'form-group lookup-item', 'data-publicid': parentId, 'data-istable': 'False' }).append(parentItem));

                editableRow.show().find('.save-lookuprow').attr('data-href', $(this).data('href'));
                editableRow.find('.btn').removeClass('disabled');

                var items = editableRow.find('.lookup-item');
                items.setForm({ prefix: '.lookup-item', customObjectId: body.data('lookupobjectid'), recordPublicId: '' });

                parentItem.trigger('change');

            } else {
                var lookupInfo = { coId: parentCustomObjectId, rId: parentRecordId, val: panel.data('lookupval'), fId: body.data('fieldid') };
                localStorage.setItem('LookupInfo', JSON.stringify(lookupInfo));

                localStorage.setItem('LookupRelationRefresh', false);
                window.open($(this).data('href'), '_blank');
                var timer = setInterval(function() {
                    if (localStorage.getItem('LookupRelationRefresh') && localStorage.getItem('LookupRelationRefresh') === 'true') {
                        localStorage.removeItem('LookupRelationRefresh');
                        clearInterval(timer);
                        if ($('#search-' + relationId + '-' + parentRecordId).length) {
                            load.lookupDetail(panel, 1, $('#search-' + relationId + '-' + parentRecordId).val(), parentRecordId, relationId, panelFilter);
                        } else {
                            load.lookupDetail(panel, 1, "", parentRecordId, relationId, panelFilter);
                        }
                    }
                }, 1500);
            }
        });

        $('body #detailRow-' + parentRecordId).on('click', '.edit-lookuprow', function(e) {
            e.stopPropagation();
            var panel = detailRow,
                body = panel.find('.panelBody'),
                panelFilter = $(this).data('viewfilterid'),
                relationId = panel.data('id');

            if (body.data('iseditinline') === true) {
                body.find('table .btn').addClass('disabled');

                var lookupItemRow = body.find('.lookup-item-tr');
                var currentRow = $(this).closest('tr'),
                    editableRow = lookupItemRow.clone()
                    .removeClass('lookup-item-tr')
                    .addClass('edit-lookup-item-tr'),
                    tds = currentRow.find('td'),
                    ths = editableRow.find('td');

                for (var i = 0; i < tds.length; i++) {
                    var td = $(tds[i]),
                        th = $(ths[i]),
                        lookupItem = th.children('.lookup-item');
                    var value = '';
                    var text = '';
                    if (typeof td.data('value') !== "undefined") {
                        value = td.data('value');
                    }
                    if (typeof td.data('text') !== "undefined") {
                        text = td.data('text');
                    }

                    if (lookupItem.length === 0) continue;

                    lookupItem.data('selecteditempublicids', value.toString());
                    lookupItem.data('value', text.toString());
                }

                currentRow.hide().after(editableRow);

                var parentId = panel.data('fieldid');
                var parentItem = $('<input/>', { 'id': parentId, 'name': parentId, 'type': 'hidden', 'value': parentRecordId });
                editableRow.find('td:first .lookup-item').append(parentItem);

                editableRow.show().find('.save-lookuprow').attr('data-href', $(this).data('href'));
                editableRow.find('.save-lookuprow').attr('data-viewfilterid', panelFilter);
                editableRow.find('.btn').removeClass('disabled');

                var items = editableRow.find('.lookup-item');
                items.setForm({ prefix: '.lookup-item', customObjectId: panel.data('lookupobjectid'), recordPublicId: currentRow.data('id'), isEditForm: true });
                parentItem.trigger('change');
            } else {
                localStorage.setItem('LookupRelationRefresh', false);
                var page = $('.goToPage').val();
                window.open($(this).data('href'), '_blank');
                var timer = setInterval(function() {
                    if (localStorage.getItem('LookupRelationRefresh') && localStorage.getItem('LookupRelationRefresh') === 'true') {
                        localStorage.removeItem('LookupRelationRefresh');
                        clearInterval(timer);
                        if ($('#search-' + relationId + '-' + parentRecordId).length) {
                            load.lookupDetail(panel, page, $('#search-' + relationId + '-' + parentRecordId).val(), parentRecordId, relationId, panelFilter);
                        } else {
                            load.lookupDetail(panel, page, "", parentRecordId, relationId, panelFilter);
                        }
                    }
                }, 1500);
            }
            return;
        });

        $('body #detailRow-' + parentRecordId).on('click', '.save-lookuprow', function(e) {
            e.stopPropagation();
            var $this = $(this),
                panel = detailRow,
                body = panel.find('.panelBody'),
                panelFilter = body.data('viewfilterid'),
                relationId = panel.data('id'),
                currentRow = $this.closest('tr'),
                elementIds = currentRow.find('.lookup-item input, .lookup-item textarea').map(function() { if (!String.isNullOrWhiteSpace(this.id)) return this.id }).get(),
                isValid = true,
                errorModal = $('#error-modal');

            $.each(panel.find(':input[required]:not(:disabled), :input[type=email]:not(:disabled)'), function() {
                var $this = $(this);
                $this.closest('.form-group').removeClass('has-error');
                if (!String.isNullOrWhiteSpace($this.val()) && $this.attr('type') === 'email' && !window.validateEmail($this.val())) {
                    $this.closest('.form-group').addClass('has-error');
                    isValid = false;
                } else if (String.isNullOrWhiteSpace($this.val()) && $this.is(':required')) {
                    $this.closest('.form-group').addClass('has-error');
                    isValid = false;
                }
            });

            if (isValid) {
                var loading = $('<div/>', { 'id': 'spinner', 'style': String.format('position:absolute; background:#fff;z-index: 1040;opacity: 0.5;top:{0}px;left:{1}px;width:{2}px;height:{3}px', panel.offset().top - 30, panel.offset().left - 10, panel.outerWidth(), panel.outerHeight() - 30) })
                    .append($('<span/>', { 'style': String.format('width:32px;height:32px;background:url(/public/img/spinner32x32.gif) no-repeat center center;position:absolute; top:{0}px;left:{1}px', (panel.outerHeight() / 2), (panel.outerWidth() / 2)) }));
                body.append(loading);
                var url = $this.data('href'),
                    data = currentRow.find('.lookup-item input, .lookup-item textarea').serializeObject();
                data.__RequestVerificationToken = token;

                $.post(url, data).done(function(r) {
                    var result = $(r);
                    var defaultMsg = result.find('#__MsgDefault div span'),
                        errorMsg = result.find('#__MsgError div span'),
                        warningMsg = result.find('#__MsgWarning div span');

                    if (!String.isNullOrWhiteSpace(defaultMsg) && defaultMsg.length > 0) {
                        var messageArea = $('#errorModalMsg');
                        messageArea.append(defaultMsg).append('<br/>');

                        if (errorMsg.length > 0) {
                            messageArea.append(errorMsg);
                        } else if (warningMsg.length > 0) {
                            errorModal.find('.modal-footer .btn-info').remove();

                            var forceForSaveBtn = $('<button />', { 'class': 'btn btn-info' }).text(' ' + window.btnForceForSave).prepend($('<i />', { 'class': 'fas fa-bolt' }));
                            messageArea.append(warningMsg);

                            errorModal.find('.modal-footer').append(forceForSaveBtn);

                            forceForSaveBtn.on('click', function() {
                                $(this).remove();
                                currentRow.find('.lookup-item').first().append($('<input />', { 'name': 'IsForcingSave', 'type': 'hidden', 'value': 'true' }));
                                $this.trigger('click');
                            });
                        }

                        errorModal.modal('toggle');
                        loading.remove();
                    } else {
                        if (currentRow.find('.lookup-item input[name=IsForcingSave]').length > 0) {
                            errorModal.modal('toggle');
                        }
                        $('body').trigger('clearChangeEvents', [{ ids: elementIds }]);
                        if ($('#search-' + relationId + '-' + parentRecordId).length) {
                            load.lookupDetail(panel, $('.goToPage').val(), $('#search-' + relationId + '-' + parentRecordId).val(), parentRecordId, relationId, panelFilter);
                        } else {
                            load.lookupDetail(panel, $('.goToPage').val(), "", parentRecordId, relationId, panelFilter);
                        }
                    }
                });
            }
            return;
        });

        $('body #detailRow-' + parentRecordId).on('click', '.cancel-lookuprow', function(e) {
            e.stopPropagation();
            var row = $(this).closest('tr'),
                table = $(this).closest('table'),
                elementIds = row.find('.lookup-item input, .lookup-item textarea').map(function() { if (!String.isNullOrWhiteSpace(this.id)) return this.id }).get();

            $('body').trigger('clearChangeEvents', [{ ids: elementIds }]);

            row.slideToggle(function() {
                table.find('.btn').removeClass('disabled');
                table.find('tbody tr').show();
                row.remove();
            });
            return;
        });
    });

    var load = {
        lookupDetail: function(trBody, page, q, parentRecordId, relationId, filter) {
            var body = trBody.find('.panelBody'),
                id = relationId,
                pageSize = 20;

            if ($('#spinner-' + id).length === 0) {
                body.prepend('<div id="spinner-' + id + '" class="text-center"><i class="fas fa-sync fa-spin fa-2x"></i></div>');
            }
            //for internet explorer
            $.get({
                url: '/lookuprelation/records?id=' + id + '&recordId=' + parentRecordId + '&pageSize=' + pageSize + '&pageNumber=' + page + '&q=' + q + '&filter=' + filter,
                cache: false
            }).then(function(r) {
                if (r.IsOk) {
                    prepareLookupTable(r, body, id, parentRecordId);
                    body.attr('data-isloaded', true);
                    body.attr('data-isaddinline', r.Relation.IsAddInline);
                    body.attr('data-iseditinline', r.Relation.IsEditInline);
                    body.attr('data-fieldid', r.Relation.FieldPublicId);
                    body.attr('data-lookupobjectid', r.Relation.LookupObjectPublicId);
                } else {
                    body.html('<center><i class="fas fa-ban fa-2x"></i></center>');
                }
            }).fail(function() {
                body.html('<center><i class="fas fa-ban fa-2x"></i></center>');
            });
        }
    };

    function getLookupItem(item) {
        var mask = item.InputMaskPattern || '';
        if (item.FieldType === 'Number' || item.FieldType === 'Rollup' || item.FieldType === 'FormulaNumber') {
            mask = mask.replaceAll('+', window.activeLanguage === 'en' ? '.' : ',').replaceAll('*', window.activeLanguage === 'en' ? ',' : '.');
        }
        var lookupItem = $('<div/>', {
            'class': 'form-group lookup-item',
            'attr': {
                'data-istable': 'False',
                'data-tableid': item.TablePublicId,
                'data-fieldtype': item.FieldType,
                'data-inputtype': item.InputHtmlType,
                'data-maxlength': item.Length,
                'data-decimalplaces': item.DecimalPlaces,
                'data-inputmaskpattern': mask,
                'data-controllingpublicid': String.isNullOrWhiteSpace(item.ControllingPublicId) ? '' : item.ControllingPublicId,
                'data-lookupobjectid': item.LookupObjectPublicId,
                'data-lookupobjectname': item.LookupObjectName,
                'data-lookupobjecturl': item.LookupObjectKey,
                'data-lookupfieldids': item.LookupFieldPublicIds,
                'data-selecteditempublicids': item.DefaultValuePublicIds,
                'data-organizationalunitname': item.OrganizationalUnitName,
                'data-organizationalunitfiltertype': item.OrganizationalUnitFilterType,
                'data-organizationalunitgrouppublicids': item.OrganizationalUnitGroupPublicIds,
                'data-organizationalunitdepth': item.OrganizationalUnitDepth,
                'data-organizationalunitincludeitself': item.OrganizationalUnitIncludeItself,
                'data-ismultiplevalue': item.IsMultipleValue ? 'True' : 'False',
                'data-isradio': item.IsRadio ? 'True' : 'False',
                'data-isrequired': item.IsRequired ? 'True' : 'False',
                'data-isunique': item.IsUnique ? 'True' : 'False',
                'data-isactive': item.IsActive ? 'True' : 'False',
                'data-isdisabled': item.Disabled ? 'True' : 'False',
                'data-isclientcalculate': item.IsClientCalculate ? 'True' : 'False',
                'data-iscalculateonclientchange': item.IsCalculateOnClientChange ? 'True' : 'False',
                'data-istablerollup': item.IsTableRollup ? 'True' : 'False',
                'data-rolluptable': item.TablePublicId,
                'data-rollupfield': item.RollupFieldPublicId,
                'data-rollupformula': item.AggregateFunction,
                'data-calculatetriggerfieldpublicids': item.CalculateTriggerFieldPublicIds,
                'data-isthousandseparator': item.IsThousandSeparator ? 'True' : 'False',
                'data-formulaname': item.FormulaName,
                'data-formulatext': item.FormulaText,
                'data-isnoteditable': item.IsEditable ? 'False' : 'True',
                'data-predefinedpublicid': item.PredefinedPublicId,
                'data-predefineddependencypublicid': item.PredefinedDependencyPublicId,
                'data-viewfilterpublicid': item.ViewFilterPublicId,
                'data-publicid': item.PublicId,
                'data-value': item.DefaultValue
            }
        });
        var label = $('<label/>', { 'for': item.PublicId }).append('&nbsp;').appendTo(lookupItem);
        if (item.FieldType === 'Lookup') {
            if (item.IsPlusButtonActive) {
                $('<a/>', { 'class': 'open-new-lookup-tab', 'data-id': item.LookupObjectPublicId, 'data-href': '/set/new/' + item.LookupObjectKey }).append($('<i />', { 'class': 'fas fa-plus pointer' })).appendTo(label);
            }
            if (item.IsViewingFilterButtonActive) {
                $('<a/>', { 'style': 'display: none; margin-left: 5px;' }).append($('<i />', { 'class': 'fas fa-external-link-alt' })).appendTo(label);
            }
        }
        return lookupItem;
    }

    function getValue(field, value) {
        var txt = '';
        var values;
        value.Value = String.isNullOrWhiteSpace(value.Value) ? '' : value.Value;
        switch (field.FieldType) {
            case 'Email':
                txt = String.isNullOrWhiteSpace(value.Value) ? '' : String.format('<a href="mailto:{0}">{0}</a>', value.Value);
                break;
            case 'Number':
            case 'Rollup':
            case 'FormulaNumber':
                //txt = String.isNullOrWhiteSpace(value.Value) ? '' : field.IsThousandSeparator ? parseFloat(value.Value.replace(',', '.')).toFixed(field.DecimalPlaces).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ".") : parseFloat(value.Value.replace(',', '.')).toFixed(field.DecimalPlaces).replace('.', ',');
                txt = String.isNullOrWhiteSpace(value.Value) ? '' : (window.activeLanguage === 'en' ? parseFloat(value.Value).toFixed(field.DecimalPlaces) : parseFloat(parseFloat(value.Value.replace(',', '.')).toFixed(field.DecimalPlaces)).toFixed(field.DecimalPlaces).replace('.', ','));
                break;
            case 'SelectList':
            case 'OrganizationalUnit':
            case 'Predefined':
                txt = String.isNullOrWhiteSpace(value.Value) ? '' : value.Value.split(window.systemSperator).map(function(x) { return x; }).join(', ');
                break;
            case 'Lookup':
                values = value.Value.split(window.systemSperator);
                txt = String.isNullOrWhiteSpace(value.SelectedItemPublicIds) ? '' : value.SelectedItemPublicIds.split(window.systemSperator).map(function(x, i) { return String.format('<a href="/set/{0}/detail/{1}" target="_blank">{2}</a>', field.LookupObjectKey, x, values[i]); }).join(', ');
                break;
                //case 'Date':
                //case 'FormulaDate':
                //case 'RollupDate':
                //    txt = String.isNullOrWhiteSpace(value.Value) ? '' : moment(value.Value, 'DD.MM.YYYY').format(window.activeLanguage === 'en' ? 'MM/DD/YYYY' : 'DD.MM.YYYY');
                //    break;
            case 'Date':
            case 'FormulaDate':
            case 'RollupDate':
                txt = String.isNullOrWhiteSpace(value.Value) ? '' : moment(value.Value, window.activeLanguage === 'en' ? 'MM/DD/YYYY' : 'DD.MM.YYYY').format(window.activeLanguage === 'en' ? 'MM/DD/YYYY' : 'DD.MM.YYYY');
                break;
            case 'Checkbox':
                if (JSON.parse(value.Value.toLowerCase())) {
                    txt = '<i class="far fa-check-square"></i>';
                } else {
                    txt = '<i class="far fa-square"></i>';
                }
                break;
            case 'Spatial':
            case 'FormulaSpatial':
                txt = String.isNullOrWhiteSpace(value.Value) ? '' : String.format('<a href="/set/map/{0}/?recordId={1}&fieldPublicId={2}" target="_blank"><i class="fas fa-map-marker-alt fa-2x"></i></a>', field.CustomObjectKey, value.RecordPublicId, value.FieldPublicId);
                break;
            case 'File':
            case 'Image':
                //TODO: Geliştirme yapılınca fieldType kontrolü kaldırılıp eski düzene dönücek.

                if (String.isNullOrWhiteSpace(value.Value)) {
                    txt = '';
                    break;
                }
                values = value.Value.split(window.systemSperator);
                var imageval = '<a target="_blank" href="/document/get/{0}">{1}</a>';
                if (field.Property == "only_view_on_detail" || field.Property == "only_view_on_modal") {
                    imageval = '<data href="/document/get/{0}" id="imageLinkModal" >{1}</data>';
                }

                if (value.FieldTypeId === 15) {
                    value.SelectedItemPublicIds = value.RecordPublicId;
                }

                var filesLr = "",
                    filesPublicIds = value.SelectedItemPublicIds.split(window.systemSperator);
                for (var i = 0; i < filesPublicIds.length; i++) {
                    imageval = '<a target="_blank" href="/document/get/{0}">{1}</a>';
                    var fileString = values[i].toLowerCase();
                    if (fileString.contains(".xls") || fileString.contains(".doc") ||
                        fileString.contains(".png") || fileString.contains(".jpg") ||
                        fileString.contains(".jpeg") || fileString.contains(".pdf")) {
                        imageval = '<a target="_blank" href="/document/Viewer/{0}">{1}</a><a target="_blank" href="/document/get/{0}"><i class="fas fa-download"></i></a>';
                    }
                    filesLr += String.format(imageval, filesPublicIds[i], values[i]) + ", ";
                }
                filesLr = filesLr.trimEnd(', ');
                //txt = String.isNullOrWhiteSpace(value.SelectedItemPublicIds) ? '' : value.SelectedItemPublicIds.split(window.systemSperator).map(function (x, i) { return String.format(imageval, x, values[i]); }).join(', ');
                txt = filesLr;
                break;
            case 'FormulaTextArea':
            case 'Html':
                txt = value.Value.htmlDecode();
                break;
            case 'Url':
                txt = String.isNullOrWhiteSpace(value.Value) ? '' : String.format('<a target="_blank" href="{0}">{0}</a>', value.Value);
                break;
            default:
                txt = value.Value;
        }
        return txt;

    }

    function prepareLookupTable(r, body, relationId, parentRecordId) {
        var panel = body,
            table = $('<table/>', { 'class': 'table table-bordered table-striped table-hover no-more-table table-color-black' }),
            thead = $('<thead/>').appendTo(table),
            tbody = $('<tbody/>').appendTo(table),
            tr = $('<tr/>'),
            td = $('<td/>'),
            itemCount = r.PagedItems.ItemCount,
            pageCount = r.PagedItems.PageCount,
            page = r.PagedItems.PageNumber,
            hasNext = pageCount > page,
            hasPrev = page > 1,
            pageCriteria = r.PageCriteria,
            adHocCriteria = r.AdHocCriteria,
            criteriaCount = pageCriteria.Criterias.length,
            isLookupPageFilterOpen = r.IsLookupPageFilterOpen,
            isExportButtonActive = r.Filter.IsExportButtonActive,
            isFilterSearchBoxActive = r.Filter.IsFilterSearchBoxActive,
            isNewButtonActive = r.Filter.IsNewButtonActive,
            isDetailButtonActive = r.Filter.IsDetailButtonActive,
            isDeleteButtonActive = r.Filter.IsDeleteButtonActive,
            isEditButtonActive = r.Filter.IsEditButtonActive,
            relationFieldPublicId = r.Relation.FieldPublicId,
            dataKey = r.CustomObject.Key,
            buttonElement = $('<div/>', { 'class': 'pull-right', 'style': 'margin: 5px 5px 5px 5px' }),
            exportElement = $('<div/>', { 'class': 'btn-group' });

        if (criteriaCount > 0 && isLookupPageFilterOpen) {
            preparePageFilter(pageCriteria, body, r.Filter.VisibleFields, adHocCriteria, relationId, parentRecordId, r);
        }

        $(panel).attr('data-viewfilterid', r.FilterId);
        var theadRowHeader = tr.clone();
        var theadRowItem = tr.clone().addClass('lookup-item-tr').hide();

        $.each(r.Filter.VisibleFields, function(index, item) {
            var th = $('<th/>', { 'data-id': item.PublicId, 'style': String.format('width: {0}%;', item.Width) });
            var label = $('<label/>', { 'for': item.PublicId }).text(item.Name + ' ').appendTo(th);
            if (!String.isNullOrWhiteSpace(item.HelpText)) {
                $('<i/>', { 'class': 'fas fa-question-circle', 'title': item.HelpText }).appendTo(label);
            }
            theadRowHeader.append(th);
            var itemTd = td.clone().append(getLookupItem(item));
            theadRowItem.append(itemTd);
        });
        if (isNewButtonActive === true) {
            theadRowHeader.append($('<th/>', { 'data-id': '#', 'class': 'text-center', 'style': 'width: 130px !important;min-width: 130px !important;', 'title': window.titlePrefixNewCustomObject })
                .html(String.format('<a data-href="/set/new/{0}" class="btn btn-sm btn-success new-lookuprow" data-viewfilterid="{1}"><i class="fas fa-plus"></i></a>', dataKey, r.FilterId)));
        } else {
            if (isDetailButtonActive === true || isDeleteButtonActive === true || isEditButtonActive === true) {
                theadRowHeader.append($('<th/>', { 'data-id': '#', 'class': 'text-center', 'style': 'width: 130px !important;min-width: 130px !important;' }));
            }
        }

        theadRowItem.append($('<th/>', { 'data-id': '#', 'class': 'text-center' })
            .html('<div class="btn-group" style="margin-top:25px;"><a class="btn btn-sm btn-success save-lookuprow"><i class="fas fa-save"></i></a><a class="btn btn-sm btn-danger cancel-lookuprow"><i class="far fa-times-circle"></i></a></div>'));
        thead.append(theadRowHeader).append(theadRowItem);

        $.each(r.PagedItems.Items, function(index, item) {
            var row = tr.clone().attr('data-id', item.PublicId).appendTo(tbody); //String.format('<tr data-id="{0}">{1}</tr>', item.Id, '{0}');

            $.each(r.Filter.VisibleFields, function(i, field) {
                var clm = td.clone();
                $.each(item.Values, function(j, value) {
                    if (field.PublicId === value.FieldPublicId) {
                        var encodedValue = value.Value != null ? value.Value.htmlEncode() : '';
                        clm.attr('data-id', value.FieldPublicId)
                            .attr('data-value', value.SelectedItemPublicIds == null ? encodedValue : value.SelectedItemPublicIds)
                            .attr('data-text', encodedValue)
                            .css('text-align', field.Align)
                            .html(getValue(field, value));

                        if (field.FieldType === 'Number' ||
                            field.FieldType === 'Rollup' ||
                            field.FieldType === 'FormulaNumber') {
                            clm.attr('data-text', getValue(field, value));
                            if (!String.isNullOrWhiteSpace(field.InputMaskPattern)) {
                                clm.inputmask({
                                    alias: 'decimal',
                                    groupSeparator: window.numberGroupSeparator,
                                    radixPoint: window.numberDecimalSeparator,
                                    autoGroup: field.IsThousandSeparator,
                                    digits: field.DecimalPlaces,
                                    clearMaskOnLostFocus: true,
                                    allowMinus: true,
                                    radixFocus: false,
                                    positionCaretOnClick: 'none',
                                    autoUnmask: true
                                });
                            }
                        }

                        if (field.FieldType === 'Date' ||
                            field.FieldType === 'FormulaDate' ||
                            field.FieldType === 'RollupDate') {
                            clm.attr('data-text', getValue(field, value));
                        }
                    }
                });
                row.append(clm);
            });
            if (isDetailButtonActive === true || isDeleteButtonActive === true || isEditButtonActive === true) {
                var lrbuttons = td.clone().attr('data-id', -1).addClass('text-center');
                var inHtml = '<div class="btn-group">';
                if (isDetailButtonActive === true) {
                    inHtml += String.format('<a target="_blank" href="/set/{0}/detail/{1}"  title="{2}" class="btn btn-sm btn-primary"><i class="fas fa-external-link-alt"></i></a>', dataKey, item.PublicId, window.btnDetail);
                }
                if (isDeleteButtonActive === true) {
                    inHtml += String.format('<a data-id="{1}" data-delete-post="/set/delete/{1}/?customObjectPublicId={2}" data-modal-body-message-url="/set/deleterecordmessage/{1}" data-check-delete-permission="/set/checkdeletepermission?customObjectId={2}" data-async="true" class="btn btn-danger btn-sm btn-delete" title="{3}" ><i class="far fa-trash-alt"></i></a>', dataKey, item.PublicId, r.CustomObject.PublicId, window.btnDelete);
                }
                if (isEditButtonActive === true) {
                    inHtml += String.format('<a data-href="/set/{0}/edit/{1}" class="btn btn-sm btn-warning edit-lookuprow" data-viewfilterid="{2}" title="{3}" ><i class="fas fa-edit"></i></a>', dataKey, item.PublicId, r.FilterId, window.btnEdit);
                }
                inHtml += '</div>';
                lrbuttons.html(inHtml);
                row.append(lrbuttons);
            }
            if (isNewButtonActive === true && isDetailButtonActive === false && isDeleteButtonActive === false && isEditButtonActive === false) {
                row.append(td.clone().attr('data-id', -1));
            }
        });

        if (criteriaCount > 0 && isLookupPageFilterOpen) {
            body.append(table);
            body.find('div.text-center').remove();
        } else {
            body.html(table);
        }

        if (body.find(".pager").length > 0) body.find(".pager").remove();
        var pager = $('<div/>', { 'class': 'row well pager', 'style': 'padding:4px !important; margin:5px 0 0 0 !important;' });
        pager.append($('<div/>', { 'class': 'col-md-4', 'style': 'text-align:left;' })
            .html(String.format('<h4><span id="itemCount">{0}</span> <small>{1}</small></h4>', itemCount, window.totalItemCount)));
        pager.append($('<div/>', { 'class': 'col-md-offset-4 col-md-4', 'data-page': page, 'data-viewfilterid': r.FilterId, 'data-pagecount': pageCount })
            .append($('<div/>', { 'class': 'btn-group pull-right' })
                .html(String.format('<a class="btn btn-default gotoNext" href="#" style="border-radius: 0;" {0}><i class="fas fa-angle-right"></i></a><a class="btn btn-default gotoLast" href="#" {0}><i class="fas fa-angle-double-right"></i></a>', hasNext ? '' : 'disabled')))
            .append(String.format('<input type="text" class="form-control pull-right goToPage" value="{0}" style="width: 50px; border-radius: 0">', page))
            .append($('<div/>', { 'class': 'btn-group pull-right' })
                .html(String.format('<a class="btn btn-default gotoFirst" href="#" {0}><i class="fas fa-angle-double-left"></i></a><a class="btn btn-default gotoPrev" href="#" style="border-radius: 0;" {0}><i class="fas fa-angle-left"></i></a>', hasPrev ? '' : 'disabled'))));

        body.append(pager);

        $('body').trigger('lookupRelationLoadTriggerEvent', relationId);

        if (isFilterSearchBoxActive) {
            var searchVal = '';
            if ($('#search-button-' + relationId + '-' + parentRecordId).length === 1) {
                searchVal = $('#search-' + relationId + '-' + parentRecordId).val();
                $('#search-input-group-' + relationId + '-' + parentRecordId).remove();
                $('#search-button-' + relationId + '-' + parentRecordId).remove();
            }

            var searchButtonGroup = $('<div/>', { 'class': 'search-input-group pull-right', 'id': String.format('search-input-group-{0}-{1}', relationId, parentRecordId) })
                .append($('<input/>', { 'class': 'form-control', 'placeholder': window.placeholderFilter, 'value': searchVal, 'type': 'text', 'id': String.format('search-{0}-{1}', relationId, parentRecordId), 'style': 'height:30px!important;margin-top:5px;margin-right:2px;' }));
            panel.prepend(searchButtonGroup);
            panel.prepend($('<button/>', { 'class': 'btn btn-primary pull-right', 'id': String.format('search-button-{0}-{1}', relationId, parentRecordId), 'style': 'padding:4px 12px 5px 12px;margin-top:5px;' }).append('<i class="fas fa-search"></i>'));
            $('#search-button-' + relationId + '-' + parentRecordId).on('click', function() {
                $(this).addClass('disabled');
                var panelElement = $('#detailRow-' + parentRecordId);
                load.lookupDetail(panelElement, 1, $('#search-' + relationId + '-' + parentRecordId).val(), parentRecordId, relationId, r.FilterId);
                $(this).removeClass('disabled');
            });
        }

        if (isExportButtonActive) {
            if ($('#export-button-' + relationId + '-' + parentRecordId).length === 1) {
                $('#export-button-' + relationId + '-' + parentRecordId).closest('div.btn-group').remove();
            }

            var exportUrl = "/set/" + r.CustomObject.PublicId + "/export/" + r.FilterId + "?&order=" + r.Order + "&isAsc=" + r.IsAsc + "&recordId=" + parentRecordId + "&fieldPublicId=" + relationFieldPublicId + "&type=";
            exportElement.append('<button type="button" id="export-button-' + relationId + '-' + parentRecordId + '" class="btn btn-sm btn-primary dropdown-toggle" data-toggle="dropdown"><i class="fas fa-download"></i> <span class="caret"></span> </button>');
            var exportUl = $('<ul/>', { 'class': 'dropdown-menu dropdown-menu-right', 'role': 'menu' });
            if ($('#search-' + relationId + '-' + parentRecordId).length === 1) {
                var val = $('#search-' + relationId + '-' + parentRecordId).val();
                exportUl.append('<li title="Excel"><a href="' + exportUrl + '1&q=' + val + '"><i class="far fa-file-excel"></i> Excel</a></li>');
                exportUl.append('<li title="Excel"><a href="' + exportUrl + '5&q=' + val + '"><i class="far fa-file-excel"></i>' + window.excelWithTableRecords + '</a></li>');
                exportUl.append('<li title="Cvs"><a href="' + exportUrl + '2&q=' + val + '"><i class="far fa-file-alt"></i> Csv</a></li>');
                exportUl.append('<li title="Pdf"><a href="' + exportUrl + '3&q=' + val + '"><i class="far fa-file-pdf"></i> Pdf</a></li>');
                exportUl.append('<li title="Word"><a href="' + exportUrl + '4&q=' + val + '"><i class="far fa-file-word"></i> Word</a></li>');
            } else {
                exportUl.append('<li title="Excel"><a href="' + exportUrl + '1"><i class="far fa-file-excel"></i> Excel</a></li>');
                exportUl.append('<li title="Excel"><a href="' + exportUrl + '5"><i class="far fa-file-excel"></i>' + window.excelWithTableRecords + '</a></li>');
                exportUl.append('<li title="Cvs"><a href="' + exportUrl + '2"><i class="far fa-file-alt"></i> Csv</a></li>');
                exportUl.append('<li title="Pdf"><a href="' + exportUrl + '3"><i class="far fa-file-pdf"></i> Pdf</a></li>');
                exportUl.append('<li title="Word"><a href="' + exportUrl + '4"><i class="far fa-file-word"></i> Word</a></li>');
            }

            exportElement.append(exportUl);
            buttonElement.append(exportElement);
            panel.prepend(buttonElement);
        }

        $('#spinner').remove();
        //$(body).find(".lookuprelation-sbody").attr("style", String.format("width: {0}px !important; max-width: {0}px !important; overflow: auto;", panelWidth));
        //$(body).find(".lookuprelation-sbody").doubleScroll();
        //$(body).doubleScroll();
    }

    function getPageCriteriaItem(criteria, field, adHocCriteria, relationId, parentRecordId) {
        var criterias = [];
        $.each(adHocCriteria.Criterias, function(index, item) {
            if (item.FieldPublicId === field.PublicId) {
                criterias.push(item);
            }
        });
        var criteriaItem = $('<tr/>', {
            'attr': {
                'data-number': criteria.Number,
                'data-operatorPublicId': criteria.OperatorPublicId,
                'data-operatorName': criteria.OperatorName,
                'data-fieldPublicId': criteria.FieldPublicId,
                'data-fieldType': field.FieldType,
                'data-isMultiple': field.IsMultipleValue,
                'data-organizationalUnitDepth': field.OrganizationalUnitDepth,
                'data-organizationalUnitFilterType': field.OrganizationalUnitFilterType,
                'data-organizationalUnitGroupPublicIds': field.OrganizationalUnitGroupPublicIds,
                'data-organizationalUnitIncludeItself': field.OrganizationalUnitIncludeItself,
                'data-organizationalUnitName': field.OrganizationalUnitName,
                'data-predefinedPublicId': field.PredefinedPublicId,
                'data-viewFilterPublicId': field.ViewFilterPublicId,
                'data-adHocCriteria': JSON.stringify(criterias)
            }
        });
        criteriaItem.append('<td><label>' + criteria.FieldName + '</label></td>');
        criteriaItem.append('<td style="width: 30% !important"><input type="text" id="pageFilterInput1_' + field.PublicId + '_' + relationId + '_' + parentRecordId + '" class="form-control" autocomplete="off" /></td>');
        var criteriatd = $('<td style="width: 30% !important"/>');
        if (criteria.OperatorName === 'between') {
            criteriatd.append('<input type="text" id="pageFilterInput2_' + field.PublicId + '_' + relationId + '_' + parentRecordId + '" class="form-control" autocomplete="off" />');
        }
        criteriaItem.append(criteriatd);
        return criteriaItem;
    }

    function preparePageFilter(pageCriteria, body, visibleFields, adHocCriteria, relationId, parentRecordId, r) {
        var table = $('<table/>', { 'class': 'table table-hover', 'id': 'pageFilterTable' }),
            tbody = $('<tbody/>'),
            panel = body,
            customObject = r.CustomObject.PublicId,
            filter = r.FilterId,
            relationFieldId = r.Relation.FieldPublicId,
            relationFieldValueKey = parentRecordId,
            relationFieldValueTxt = panel.data('lookupval'),
            pageFilterSearch = $('<div/>', { 'class': 'col-md-12 text-right' }),
            pageFilterSearchButton = $('<button id="btnPageFilter' + relationId + '_' + parentRecordId + '" name="btnPageFilter' + relationId + '_' + parentRecordId + '" class="btn btn-sm btn-success" style="margin-bottom:5px">' + window.lblSearch + '</button>'),
            panelWidth = (panel.width() - 30);

        $.each(pageCriteria.Criterias, function(i, criteria) {
            $.each(visibleFields, function(index, item) {
                if (criteria.FieldPublicId === item.PublicId) {
                    var pageCriteriaItem = getPageCriteriaItem(criteria, item, adHocCriteria, relationId, parentRecordId);
                    tbody.append(pageCriteriaItem);
                }
            });
        });
        table.append(tbody);
        //body.find(".lookuprelation-sbody").html(table);
        body.html(table);
        pageFilterSearch.append(pageFilterSearchButton);
        //body.find(".lookuprelation-sbody").append(pageFilterSearch);
        body.append(pageFilterSearch);
        var rows = table.find('tr');
        preparePageFilterItem(rows, customObject, relationId, parentRecordId);

        $('#btnPageFilter' + relationId + '_' + parentRecordId).on('click', function() {
            var filterList = [],
                number = 0,
                condition = [];
            $(this).addClass('disabled');
            number++;
            filterList.push({
                Number: number,
                FieldPublicId: relationFieldId,
                OperatorPublicId: "8B145F5B80D6418388A09DFD633846C6",
                Value: relationFieldValueKey,
                Text: relationFieldValueTxt
            });

            condition.push('{');
            condition.push(number);
            condition.push('}');

            $.each(rows, function(i, r) {
                var row = $(r),
                    input1Selector = '#pageFilterInput1_' + row.data('fieldpublicid') + '_' + relationId + '_' + parentRecordId,
                    input2Selector = '#pageFilterInput2_' + row.data('fieldpublicid') + '_' + relationId + '_' + parentRecordId,
                    input1 = row.find(input1Selector),
                    input2 = row.find(input2Selector),
                    filterValue = input1.val(),
                    filterText = filterValue;

                if (!String.isNullOrWhiteSpace(filterValue) && number !== 0) {
                    condition.push(' AND ');
                }

                if (row.data('operatorname') !== 'between') {
                    if (!String.isNullOrWhiteSpace(filterValue)) {
                        number++;
                        if (!$(input1Selector).hasClass('form-control') && $(input1Selector).select2('data')) {
                            if (!String.isNullOrWhiteSpace($(input1Selector).select2('data').text)) {
                                filterText = $(input1Selector).select2('data').text;;
                            } else {
                                var mappedData = $.map($(input1Selector).select2('data'),
                                    function(data) { return data.text; });
                                filterText = mappedData.join(window.systemSperator);
                            }
                        }
                        filterList.push({
                            Number: number,
                            FieldPublicId: row.data('fieldpublicid'),
                            OperatorPublicId: row.data('operatorpublicid'),
                            Value: filterValue,
                            Text: filterText
                        });

                        condition.push('{');
                        condition.push(number);
                        condition.push('}');
                    }

                } else {
                    if (!String.isNullOrWhiteSpace(filterValue)) {
                        number++;
                        filterList.push({
                            Number: number,
                            FieldPublicId: row.data('fieldpublicid'),
                            OperatorPublicId: getOperatorPublicId(row.data('fieldtype'), 'greater_than_or_equal'),
                            Value: filterValue,
                            Text: filterText
                        });

                        condition.push('{');
                        condition.push(number);
                        condition.push('}');
                    }

                    if (!String.isNullOrWhiteSpace(input2.val())) {

                        if (number !== 0) {
                            condition.push(' AND ');
                        }

                        number++;
                        filterList.push({
                            Number: number,
                            FieldPublicId: row.data('fieldpublicid'),
                            OperatorPublicId: getOperatorPublicId(row.data('fieldtype'), 'less_than_or_equal'),
                            Value: input2.val(),
                            Text: input2.val()
                        });

                        condition.push('{');
                        condition.push(number);
                        condition.push('}');
                    }
                }
            });
            var postData = {
                __RequestVerificationToken: $('input[name="__RequestVerificationToken"]').val(),
                CustomObjectPublicId: customObject,
                ViewFilterPublicId: filter,
                CriteriaExpression: condition.join(''),
                Criterias: filterList
            };

            $.post('/ViewFilter/AdHoc', postData, function(r) {
                if (r && r.IsOk) {
                    var panelElement = $('#detailRow-' + parentRecordId);
                    if ($('#search-' + relationId + '-' + parentRecordId).length) {
                        load.lookupDetail(panelElement, 1, $('#search-' + relationId + '-' + parentRecordId).val(), parentRecordId, relationId, r.Result);
                    } else {
                        load.lookupDetail(panelElement, 1, "", parentRecordId, relationId, r.Result);
                    }
                    $(this).removeClass('disabled');
                }
            });
        });
    }

    function preparePageFilterItem(rows, customObject, relationId, parentRecordId) {
        $.each(rows, function(i, r) {
            var row = $(r),
                input1Selector = '#pageFilterInput1_' + row.data('fieldpublicid') + '_' + relationId + '_' + parentRecordId,
                input2Selector = '#pageFilterInput2_' + row.data('fieldpublicid') + '_' + relationId + '_' + parentRecordId,
                input1 = row.find(input1Selector),
                input2 = row.find(input2Selector),
                isMultiple = row.data('ismultiple') === 'True',
                adHocCriteria = row.data('adhoccriteria');

            if (!isMultiple && (row.data('operatorname') === 'includes' || row.data('operatorname') === 'not_includes')) {
                isMultiple = true;
            }

            if (row.data('operatorname') === 'equals' ||
                row.data('operatorname') === 'not_equal_to' ||
                row.data('operatorname') === 'not_includes' ||
                row.data('operatorname') === 'includes') {
                input1.removeClass('form-control');

                if (row.data('fieldtype') === 'SelectList' || row.data('fieldtype') === 'Checkbox') {
                    prepareSelect2(input1Selector, '/Summary/FieldItems', { id: row.data('fieldpublicid') }, null, isMultiple);
                } else if (row.data('fieldtype') === 'Lookup') {
                    prepareSelect2(input1Selector,
                        '/Summary/LookupFieldValues', {
                            coId: customObject,
                            id: row.data('fieldpublicid'),
                            viewFilterId: row.data('viewfilterpublicid')
                        }, null, isMultiple);
                } else if (row.data('fieldtype') === 'Predefined') {
                    prepareSelect2(input1Selector, '/summary/PredefinedItems', { parentId: row.data('predefinedpublicid') }, null, isMultiple);
                } else if (row.data('fieldtype') === 'OrganizationalUnit' || row.data('fieldtype') === 'FormulaOrganizationalUnit') {
                    prepareSelect2(input1Selector,
                        '/summary/organizationalunititems', {
                            publicId: row.data('fieldpublicid'),
                            name: row.data('organizationalunitname'),
                            filterType: row.data('organizationalunitfiltertype'),
                            groupIds: row.data('organizationalunitgrouppublicids'),
                            depth: row.data('organizationalunitdepth'),
                            includeItSelf: row.data('organizationalunitincludeitself'),
                            isAddCurrentKeys: false
                        }, null, isMultiple);
                } else if (row.data('fieldtype') === 'Phone') {
                    input1.addClass('form-control');
                    preparePhoneNumber(input1Selector);
                } else {
                    input1.addClass('form-control');
                }
            }

            if (row.data('fieldtype') === 'Date' ||
                row.data('fieldtype') === 'DateTime' ||
                row.data('fieldtype') === 'FormulaDateTime' ||
                row.data('fieldtype') === 'FormulaDate' ||
                row.data('fieldtype') === 'RollupDateTime' ||
                row.data('fieldtype') === 'RollupDate') {
                input1.addClass('form-control');
                prepareDatePicker(input1Selector, row.data('fieldtype'));
                $(input1Selector).datetimepicker('setOptions', { defaultTime: '00:00:00' });
                if (row.data('operatorname') === 'between') {
                    prepareDatePicker(input2Selector, row.data('fieldtype'));
                    $(input2Selector).datetimepicker('setOptions', { defaultTime: '23:59:59' });
                }
            }

            if (adHocCriteria.any()) {
                if (row.data('fieldtype') === 'SelectList' ||
                    row.data('fieldtype') === 'Lookup' ||
                    row.data('Predefined') === 'Predefined' ||
                    row.data('fieldtype') === 'OrganizationalUnit') {
                    prepareSelect2SelectedOneItem(input1Selector, adHocCriteria[0].Value, adHocCriteria[0].Text, isMultiple);
                    //  prepareSelect2SelectedOneItem(input1Selector, adHocCriteria[0].Value, adHocCriteria[0].Text.replaceAll(',', window.systemSperator), isMultiple);
                } else if (row.data('fieldtype') === 'Date') {
                    var val = adHocCriteria.first('OperatorName', 'greather_than_or_equal_to');
                    if (val !== null) {
                        var date = moment(val.Value).format(window.activeLanguage === 'en' ? 'MM/DD/YYYY' : 'DD.MM.YYYY');
                        input1.val(date);
                    }
                } else if (row.data('fieldtype') === 'DateTime' ||
                    row.data('fieldtype') === 'FormulaDateTime' ||
                    row.data('fieldtype') === 'RollupDateTime') {
                    var val = adHocCriteria.first('OperatorName', 'greather_than_or_equal_to');
                    if (val !== null) {
                        var date = moment(val.Value).format(window.activeLanguage === 'en' ? 'MM/DD/YYYY hh:mm:ss a' : 'DD.MM.YYYY HH:mm:ss');
                        input1.val(date);
                    }
                } else {
                    input1.val(adHocCriteria[0].Value);
                }

                if (row.data('operatorname') === 'between') {
                    var val = adHocCriteria.first('OperatorName', 'less_than_or_equal_to');
                    if (val !== null) {
                        if (row.data('fieldtype') === 'Date') {
                            input2.val(moment(val.Value).format(window.activeLanguage === 'en' ? 'MM/DD/YYYY' : 'DD.MM.YYYY'));
                        } else if (row.data('fieldtype') === 'DateTime' ||
                            row.data('fieldtype') === 'FormulaDateTime' ||
                            row.data('fieldtype') === 'RollupDateTime') {
                            input2.val(moment(val.Value).format(window.activeLanguage === 'en' ? 'MM/DD/YYYY hh:mm:ss a' : 'DD.MM.YYYY HH:mm:ss'));
                        } else {
                            input2.val(adHocCriteria[1].Value);
                        }
                    }
                }
            }
        });
    }

    function getOperatorPublicId(fieldType, operatorType) {
        if (fieldType === 'Number' && operatorType === 'greater_than_or_equal') return 'AEDE83DA57B24467B5465D582FA1BEB6';
        if (fieldType === 'Number' && operatorType === 'less_than_or_equal') return 'D69B63FEB8654E2BAE3C4ED9CA90AF7A';
        if (fieldType === 'FormulaNumber' && operatorType === 'greater_than_or_equal') return '010973EB54414C6E940AF24CBF03BCFA';
        if (fieldType === 'FormulaNumber' && operatorType === 'less_than_or_equal') return '7D9C72EA57844996A89BA6DB82F29937';
        if (fieldType === 'Date' && operatorType === 'greater_than_or_equal') return '20EB4BA7E4464B2483E7428E0517B5FD';
        if (fieldType === 'Date' && operatorType === 'less_than_or_equal') return 'BD7CE1D5EDFD419BA7B1578EBE5BC680';
        if (fieldType === 'DateTime' && operatorType === 'greater_than_or_equal') return 'EEC2045EA6E243B3A01E05C6AFD0FB71';
        if (fieldType === 'DateTime' && operatorType === 'less_than_or_equal') return '4F9D309851DA4C5A909CDBEAC74803A5';
        if (fieldType === 'FormulaDateTime' && operatorType === 'greater_than_or_equal') return 'EBC25606797A4BDABB1D2AEBC8F9FD5B';
        if (fieldType === 'FormulaDateTime' && operatorType === 'less_than_or_equal') return '381E280E43C54ED5BE88821F638F3511';
        if (fieldType === 'FormulaDate' && operatorType === 'greater_than_or_equal') return '75F04154E37C4B948BFAB949F5688CAF';
        if (fieldType === 'FormulaDate' && operatorType === 'less_than_or_equal') return '547572437C35442483CBFBA04187C1EE';
        if (fieldType === 'RollupDateTime' && operatorType === 'greater_than_or_equal') return 'EBC25606797A4BDBBB1D2AEBC8F9FD5B';
        if (fieldType === 'RollupDateTime' && operatorType === 'less_than_or_equal') return '381E280E43C54ED6BE88821F638F3511';
        if (fieldType === 'RollupDate' && operatorType === 'greater_than_or_equal') return '75F04154E37C4B958BFAB949F5688CAF';
        if (fieldType === 'RollupDate' && operatorType === 'less_than_or_equal') return '547572437C35441883CBFBA04187C1EE';

        return null;
    };
});