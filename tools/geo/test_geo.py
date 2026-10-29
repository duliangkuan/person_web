import copy
import unittest
from geo import Page, inspect_html, summarize

class ExtractionTests(unittest.TestCase):
    def test_script_and_style_are_not_public_body(self):
        p=Page();p.feed('<html><head><title>杜亮宽</title></head><body><script>杜亮宽 founder</script><style>secret</style><p>实际正文</p></body></html>')
        self.assertEqual(p.text,'实际正文');self.assertEqual(p.title,'杜亮宽')
    def test_boot_only_is_not_an_acceptable_profile(self):
        r=inspect_html('<html><head><title>风云</title></head><body>boot</body></html>','/')
        self.assertIn('Name missing from no-JavaScript body',r['errors'])
        self.assertIn('Missing canonical Person',r['errors'])
    def test_wrong_entity_same_as_is_rejected(self):
        r=inspect_html('<body><h1>杜亮宽</h1><script type="application/ld+json">{"@type":"Person","name":"杜亮宽","sameAs":["https://github.com/anywhere-labs/dsh-desktop"]}</script></body>','/about')
        self.assertIn('Related project misused as person sameAs',r['errors'])

def observation(**overrides):
    o=dict(id='a',surface='consumer_doubao',mode='default',group='pure_name',prompt='杜亮宽是谁？',captured_at='2026-10-29T10:00:00+08:00',transport_status='complete',answer='原始回答',review={'identity_correct':True,'core_facts_sufficient':True,'major_error':False})
    o.update(overrides);return o

class ObservationTests(unittest.TestCase):
    def test_major_error_overrides_name_mention(self):
        o=observation();o['review']['major_error']=True
        self.assertEqual(summarize([o])['groups'][0]['success'],0)
    def test_modes_and_surfaces_cannot_inflate_each_other(self):
        rows=[observation(),observation(id='b',surface='api_doubao_app'),observation(id='c',mode='explicit_search')]
        self.assertEqual(len(summarize(rows)['groups']),3)
    def test_blocked_and_unreviewed_are_explicit_not_successes(self):
        r=summarize([observation(transport_status='blocked',answer='',review=None),observation(id='b',review=None)])['groups'][0]
        self.assertEqual(r['blocked_or_transport_errors'],1);self.assertEqual(r['pending_review'],1);self.assertIsNone(r['success_rate'])
    def test_duplicate_records_fail(self):
        with self.assertRaisesRegex(ValueError,'Duplicate'):summarize([observation(),observation()])
    def test_string_booleans_are_rejected(self):
        o=observation();o['review']['major_error']='false'
        with self.assertRaises(ValueError):summarize([o])
    def test_complete_run_requires_actual_answer(self):
        with self.assertRaises(ValueError):summarize([observation(answer='')])
    def test_unjudged_inputs_never_become_100_percent(self):
        r=summarize([observation(review=None)])['groups'][0]
        self.assertEqual(r['reviewed'],0);self.assertIsNone(r['success_rate'])
    def test_group_failure_does_not_hide_in_global_average(self):
        o=observation(id='b',group='relationship');o['review']['core_facts_sufficient']=False
        rs=summarize([observation(),o])['groups']
        self.assertEqual({r['group']:r['success_rate'] for r in rs},{'pure_name':1.0,'relationship':0.0})

if __name__=='__main__':unittest.main()
