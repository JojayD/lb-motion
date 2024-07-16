const flagUrls = [
	"ac.svg",
	"ad.svg",
	"ae.svg",
	"af-emirate.svg",
	"af.svg",
	"ag.svg",
	"ai.svg",
	"al.svg",
	"am.svg",
	"an.svg",
	"ao.svg",
	"aq-true_south.svg",
	"aq.svg",
	"ar.svg",
	"as.svg",
	"at.svg",
	"au-aboriginal.svg",
	"au-act.svg",
	"au-nsw.svg",
	"au-nt.svg",
	"au-qld.svg",
	"au-sa.svg",
	"au-tas.svg",
	"au-torres_strait_islands.svg",
	"au-vic.svg",
	"au-wa.svg",
	"au.svg",
	"aw.svg",
	"ax.svg",
	"az.svg",
	"ba.svg",
	"bb.svg",
	"bd.svg",
	"be.svg",
	"bf.svg",
	"bg.svg",
	"bh.svg",
	"bi.svg",
	"bj.svg",
	"bl.svg",
	"bm.svg",
	"bn.svg",
	"bo.svg",
	"bq-bo.svg",
	"bq-sa.svg",
	"bq-se.svg",
	"bq.svg",
	"br.svg",
	"bs.svg",
	"bt.svg",
	"bv.svg",
	"bw.svg",
	"by.svg",
	"bz.svg",
	"ca-bc.svg",
	"ca-qc.svg",
	"ca.svg",
	"cc.svg",
	"cd.svg",
	"cf.svg",
	"cg.svg",
	"ch-gr.svg",
	"ch.svg",
	"ci.svg",
	"ck.svg",
	"cl.svg",
	"cm.svg",
	"cn-hk.svg",
	"cn-xj.svg",
	"cn.svg",
	"co.svg",
	"cp.svg",
	"cq.svg",
	"cr.svg",
	"cu.svg",
	"cv.svg",
	"cw.svg",
	"cx.svg",
	"cy.svg",
	"cz.svg",
	"de.svg",
	"dg.svg",
	"dj.svg",
	"dk.svg",
	"dm.svg",
	"do.svg",
	"dz.svg",
	"ea.svg",
	"east_african_federation.svg",
	"easter_island.svg",
	"ec-w.svg",
	"ec.svg",
	"ee.svg",
	"eg.svg",
	"eh.svg",
	"er.svg",
	"es-ar.svg",
	"es-ce.svg",
	"es-cn.svg",
	"es-ct.svg",
	"es-ga.svg",
	"es-ib.svg",
	"es-ml.svg",
	"es-pv.svg",
	"es-variant.svg",
	"es.svg",
	"et-af.svg",
	"et-am.svg",
	"et-be.svg",
	"et-ga.svg",
	"et-ha.svg",
	"et-or.svg",
	"et-si.svg",
	"et-sn.svg",
	"et-so.svg",
	"et-sw.svg",
	"et-ti.svg",
	"et.svg",
	"eu.svg",
	"european_union.svg",
	"ewe.svg",
	"fi.svg",
	"fj.svg",
	"fk.svg",
	"fm.svg",
	"fo.svg",
	"fr-20r.svg",
	"fr-bre.svg",
	"fr-cp.svg",
	"fr.svg",
	"fx.svg",
	"ga.svg",
	"gb-con.svg",
	"gb-eng.svg",
	"gb-nir.svg",
	"gb-ork.svg",
	"gb-sct.svg",
	"gb-wls.svg",
	"gb.svg",
	"gd.svg",
	"ge-ab.svg",
	"ge.svg",
	"gf.svg",
	"gg.svg",
	"gh.svg",
	"gi.svg",
	"gl.svg",
	"gm.svg",
	"gn.svg",
	"gp.svg",
	"gq.svg",
	"gr.svg",
	"gs.svg",
	"gt.svg",
	"gu.svg",
	"guarani.svg",
	"gw.svg",
	"gy.svg",
	"hausa.svg",
	"hk.svg",
	"hm.svg",
	"hmong.svg",
	"hn.svg",
	"hr.svg",
	"ht.svg",
	"hu.svg",
	"ic.svg",
	"id-jb.svg",
	"id-jt.svg",
	"id.svg",
	"ie.svg",
	"il.svg",
	"im.svg",
	"in-as.svg",
	"in-gj.svg",
	"in-ka.svg",
	"in-mn.svg",
	"in-mz.svg",
	"in-or.svg",
	"in-tg.svg",
	"in-tn.svg",
	"in.svg",
	"io.svg",
	"iq-kr.svg",
	"iq.svg",
	"ir.svg",
	"is.svg",
	"it-21.svg",
	"it-23.svg",
	"it-25.svg",
	"it-32.svg",
	"it-34.svg",
	"it-36.svg",
	"it-42.svg",
	"it-45.svg",
	"it-52.svg",
	"it-55.svg",
	"it-57.svg",
	"it-62.svg",
	"it-65.svg",
	"it-67.svg",
	"it-72.svg",
	"it-75.svg",
	"it-77.svg",
	"it-78.svg",
	"it-82.svg",
	"it-88.svg",
	"it.svg",
	"je.svg",
	"jm.svg",
	"jo.svg",
	"jp.svg",
	"kanuri.svg",
	"ke.svg",
	"kg.svg",
	"kh.svg",
	"ki.svg",
	"kikuyu.svg",
	"km.svg",
	"kn.svg",
	"kongo.svg",
	"kr.svg",
	"kw.svg",
	"ky.svg",
	"kz.svg",
	"la.svg",
	"lb.svg",
	"lc.svg",
	"li.svg",
	"lk.svg",
	"lr.svg",
	"ls.svg",
	"lt.svg",
	"lu.svg",
	"lv.svg",
	"ly.svg",
	"ma.svg",
	"malayali.svg",
	"maori.svg",
	"mc.svg",
	"md.svg",
	"me.svg",
	"mf.svg",
	"mg.svg",
	"mh.svg",
	"mk.svg",
	"ml.svg",
	"mm.svg",
	"mn.svg",
	"mo.svg",
	"mp.svg",
	"mq-old.svg",
	"mq.svg",
	"mr.svg",
	"ms.svg",
	"mt.svg",
	"mu.svg",
	"mv.svg",
	"mw.svg",
	"mx.svg",
	"my.svg",
	"mz.svg",
	"na.svg",
	"nc.svg",
	"ne.svg",
	"nf.svg",
	"ng.svg",
	"ni.svg",
	"nl-fr.svg",
	"nl.svg",
	"no.svg",
	"northern_cyprus.svg",
	"np.svg",
	"nr.svg",
	"nu.svg",
	"nz.svg",
	"occitania.svg",
	"om.svg",
	"otomi.svg",
	"pa.svg",
	"pe.svg",
	"pf.svg",
	"pg.svg",
	"ph.svg",
	"pk-jk.svg",
	"pk-sd.svg",
	"pk.svg",
	"pl.svg",
	"pm.svg",
	"pn.svg",
	"pr.svg",
	"ps.svg",
	"pt-20.svg",
	"pt-30.svg",
	"pt.svg",
	"pw.svg",
	"py.svg",
	"qa.svg",
	"quechua.svg",
	"re.svg",
	"ro.svg",
	"rs.svg",
	"ru-ba.svg",
	"ru-ce.svg",
	"ru-cu.svg",
	"ru-da.svg",
	"ru-dpr.svg",
	"ru-ko.svg",
	"ru-lpr.svg",
	"ru-ta.svg",
	"ru-ud.svg",
	"ru.svg",
	"rw.svg",
	"sa.svg",
	"sami.svg",
	"sb.svg",
	"sc.svg",
	"sd.svg",
	"se.svg",
	"sg.svg",
	"sh-ac.svg",
	"sh-hl.svg",
	"sh-ta.svg",
	"sh.svg",
	"si.svg",
	"sj.svg",
	"sk.svg",
	"sl.svg",
	"sm.svg",
	"sn.svg",
	"so.svg",
	"somaliland.svg",
	"south_ossetia.svg",
	"soviet_union.svg",
	"sr.svg",
	"ss.svg",
	"st.svg",
	"su.svg",
	"sv.svg",
	"sx.svg",
	"sy.svg",
	"sz.svg",
	"ta.svg",
	"tc.svg",
	"td.svg",
	"tf.svg",
	"tg.svg",
	"th.svg",
	"tibet.svg",
	"tj.svg",
	"tk.svg",
	"tl.svg",
	"tm.svg",
	"tn.svg",
	"to.svg",
	"tr.svg",
	"transnistria.svg",
	"tt.svg",
	"tv.svg",
	"tw.svg",
	"tz.svg",
	"ua.svg",
	"ug.svg",
	"uk.svg",
	"um.svg",
	"un.svg",
	"us-ak.svg",
	"us-al.svg",
	"us-ar.svg",
	"us-as.svg",
	"us-az.svg",
	"us-betsy_ross.svg",
	"us-ca.svg",
	"us-co.svg",
	"us-dc.svg",
	"us-fl.svg",
	"us-ga.svg",
	"us-gu.svg",
	"us-hi.svg",
	"us-in.svg",
	"us-md.svg",
	"us-mo.svg",
	"us-mp.svg",
	"us-ms.svg",
	"us-nc.svg",
	"us-nm.svg",
	"us-or.svg",
	"us-pr.svg",
	"us-ri.svg",
	"us-sc.svg",
	"us-tn.svg",
	"us-tx.svg",
	"us-um.svg",
	"us-vi.svg",
	"us-wa.svg",
	"us-wi.svg",
	"us-wy.svg",
	"us.svg",
	"uy.svg",
	"uz.svg",
	"va.svg",
	"vc.svg",
	"ve.svg",
	"vg.svg",
	"vi.svg",
	"vn.svg",
	"vu.svg",
	"wf.svg",
	"wiphala.svg",
	"ws.svg",
	"xk.svg",
	"xx.svg",
	"ye.svg",
	"yorubaland.svg",
	"yt.svg",
	"yu.svg",
	"za.svg",
	"zm.svg",
	"zw.svg",
];
export default flagUrls;