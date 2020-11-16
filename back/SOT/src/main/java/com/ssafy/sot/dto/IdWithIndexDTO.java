package com.ssafy.sot.dto;

public class IdWithIndexDTO {
	
	int id;
	int startIdx;
	int amount;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getStartIdx() {
		return startIdx;
	}
	public void setStartIdx(int startIdx) {
		this.startIdx = startIdx;
	}
	public int getAmount() {
		return amount;
	}
	public void setAmount(int amount) {
		this.amount = amount;
	}
	@Override
	public String toString() {
		return "IdWithIndexDTO [id=" + id + ", startIdx=" + startIdx + ", amount=" + amount + "]";
	}
	public IdWithIndexDTO() {
	}
	public IdWithIndexDTO(int id, int startIdx, int amount) {
		this.id = id;
		this.startIdx = startIdx;
		this.amount = amount;
	}
	
}
