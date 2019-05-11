const notes = [
        {
            title: 'Redux',
            noteText: 'Redux helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test.'
        },
        {
            title: 'Heroku',
            noteText: 'Heroku — облачная PaaS-платформа, поддерживающая ряд языков программирования. С 2010 года является дочерней компанией Salesforce.com.'
        },
        {
            title: 'CSS',
            noteText: 'CSS — спеціальна мова, що використовується для опису зовнішнього вигляду сторінок, написаних мовами розмітки даних. Найчастіше CSS використовують для візуальної презентації сторінок, написаних HTML та XHTML, але формат CSS може застосовуватися до інших видів XML-документів.'
        }
    ]
;


export function getNotes()
{
    return notes;
}