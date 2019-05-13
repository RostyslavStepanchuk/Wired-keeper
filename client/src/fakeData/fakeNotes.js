const notes = [
        {
            _id: 1,
            title: 'Redux',
            type: 'note',
            noteText: 'Redux helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test.'
        },
        {
            _id: 2,
            title: 'Heroku',
            type: 'note',
            noteText: 'Heroku — облачная PaaS-платформа, поддерживающая ряд языков программирования. С 2010 года является дочерней компанией Salesforce.com.'
        },
        {
            _id: 3,
            title: 'CSS',
            type: 'note',
            noteText: 'CSS — спеціальна мова, що використовується для опису зовнішнього вигляду сторінок, написаних мовами розмітки даних. Найчастіше CSS використовують для візуальної презентації сторінок, написаних HTML та XHTML, але формат CSS може застосовуватися до інших видів XML-документів.'
        }
    ]
;


export function getNotes()
{
    return notes;
}